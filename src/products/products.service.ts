import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductsService {

  private defaultLimit: number

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    private configService: ConfigService
  ){
    this.defaultLimit = this.configService.get<number>('defaultLimit') // USar lo que esta en el EnvConfig
  }

  async create(createProductDto: CreateProductDto) {

    const { category, ...productProperties } = createProductDto;

    const newCategory = await this.categoryModel.findOne({
      name: category
    })

    if(!newCategory) throw new NotFoundException('Category not Found!!')
      
    if(!newCategory.available) {
      throw new BadRequestException(`The Category ${newCategory.name} not available!`)
    }

    try {
      const product = await this.productModel.create({
        ...productProperties,
        category: newCategory._id
      })

      await product.save()
      return product;

    } catch (error) {
      this.exceptionHandler(error)
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = this.defaultLimit, offset = 0 } = paginationDto

    return await this.productModel.find()
      .limit(limit)
      .skip(offset)
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id, { __v: 0 })
      .populate('category')

    if(!product) {
      throw new NotFoundException(`Product with id: "${id}" not found!`)
    }

    return product
  }
s
  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.findOne(id)
    await productToUpdate.updateOne(updateProductDto)

    return {
      ...productToUpdate.toJSON(),
      ...updateProductDto
    }
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.productModel.findByIdAndDelete(id)

    return product
  }

  private exceptionHandler(error: any) {
    if(error.code === 11000) {
      throw new BadRequestException(`Error: ${JSON.stringify(error.keyValue)} exist in DB!`)
    }

    console.log(error)
    throw new InternalServerErrorException('Internal Server Error, Check Logs')
  }
}
