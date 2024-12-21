import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  collection: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  photoUrl: string;

  @Prop({ default: 0 })
  stock: number;

  _id: Types.ObjectId;

  get id(): string {
    return this._id.toString();
  }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
