import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {

  @Prop({
    required: true,
    index: true,
    unique: true
  })
  name: string;

  @Prop({
    required: true,
    index: true
  })
  description: string;

  @Prop({
    required: true,
    index: true
  })
  available: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.__v;
    return ret;
  }
})