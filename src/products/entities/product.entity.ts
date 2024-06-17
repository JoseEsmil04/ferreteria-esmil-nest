import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument } from "mongoose"

export type ProductDocument = HydratedDocument<Product>

@Schema()
export class Product {

  @Prop({
    index: true,
    unique: true,
    required: true
  })
  name: string

  @Prop({
    index: true,
    required: true
  })
  description: string

  @Prop({
    index: true,
    required: true
  })
  price: number

  @Prop({
    index: true,
    required: true
  })
  stock: number

  @Prop({
    index: true,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  })
  category: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
