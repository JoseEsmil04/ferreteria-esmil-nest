import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { ProductsModule } from 'src/products/products.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Order.name, schema: OrderSchema }]
    ),
    ProductsModule,
    CustomerModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
