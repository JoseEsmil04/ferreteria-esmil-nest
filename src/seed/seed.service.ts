import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { products } from './data/products';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private readonly productService: ProductsService
  ) {}

  async executeSeedDB(limit: number) {
    await this.productModel.deleteMany({})

    products.length = limit

    for(let i = 0; i < limit; i++) {
      (await this.productService.create(products[i]))
    }

    

    return 'SEED EXECUTED!'
  }

}
