import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class CategoryService {

  private defaultLimit: number;

  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = this.configService.get<number>('DEFAULT_LIMIT')
  }

  private logger = new Logger('Category');

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.create(createCategoryDto);
      await category.save();
      return category;

    } catch (error) {
      this.exceptionsHandler(error);
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    return this.categoryModel.find()
      .limit(limit)
      .skip(offset) 
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);

    if(!category) {
      throw new NotFoundException(`Category with Id ${id} not found!`)
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    try {
      await category.updateOne(updateCategoryDto);

      return {
        ...category.toJSON(),
        ...updateCategoryDto
      };

    } catch (error) {
      this.exceptionsHandler(error)
    }
  }

  async remove(id: string) {
    const categoryToRemove = await this.findOne(id);
    await categoryToRemove.deleteOne();

    return categoryToRemove;
  }

  private exceptionsHandler(err: any) {

    if(err.code === 11000) {
      throw new BadRequestException(err.errmsg)
    }

    this.logger.error(err)
    throw new InternalServerErrorException('Internal Server Error - Check Logs')
  }
}
