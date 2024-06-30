import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './config/envconfig';
import { JoiSchema } from './config/joi.config';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: JoiSchema 
    }),
    MongooseModule.forRoot(EnvConfig().mongoDbUri),
    // Servicio Statico
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }),
    ProductsModule,
    CommonModule,
    SeedModule,
    CategoryModule,
    CustomerModule,
    OrderModule
  ],
})
export class AppModule {}
