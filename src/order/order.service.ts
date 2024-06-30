import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { products } from '../seed/data/products';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrderService {

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>
  ){}

  async create(createOrderDto: CreateOrderDto, customer: Customer) {

    if(!customer) throw new BadRequestException('Customer is Required!')
    
    const { products } = createOrderDto;

    const productsDB = await Promise.all(products.map(async (product) => {
      const productExist = await this.productModel.findOneAndUpdate(
        { name: product },
        { $inc: { stock: -1 } }, // Utilizar $inc para decrementar el stock
        { new: true } // Devuelve el documento actualizado
      );
    
      if (!productExist) throw new NotFoundException(`Product ${product} not found!`);
    
      return productExist._id;
    }));
    
    
    const newOrder = await this.orderModel.create({ 
      ...createOrderDto,
      products: productsDB,
      customer
    })

    await newOrder.save()

    return newOrder;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
