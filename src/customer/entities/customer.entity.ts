import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type CustomerDocument = HydratedDocument<Customer>

@Schema()
export class Customer {

  @Prop({
    required: true,
    index: true
  })
  name: string;

  @Prop({
    required: true,
    index: true,
    length: { maxlength: 50, minlength: 6 }
  })
  password: string;

  @Prop({
    required: true,
    index: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true,
    index: true,
    default: true
  })
  isActive: boolean;

  @Prop({
    required: true,
    index: true,
    type: Array,
    default: ['user']
  })
  roles: string[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
