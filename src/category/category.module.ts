import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), ConfigModule],
  exports: [CategoryService]
})
export class CategoryModule {}
