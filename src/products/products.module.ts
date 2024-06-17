import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from 'src/category/category.module';
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema }
    ]),
    CategoryModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [MongooseModule, ProductsService]
})
export class ProductsModule {}
