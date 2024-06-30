import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "src/customer/entities/customer.entity";
import { ValidState } from "../interfaces/state.interface";
import { Product } from "src/products/entities/product.entity";

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order {

  @Prop({
    index: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  })
  customer: Customer

  @Prop({
    index: true,
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product'
  })
  products: Product[]

  @Prop({
    index: true,
    required: true
  })
  state: ValidState


}

export const OrderSchema = SchemaFactory.createForClass(Order)
