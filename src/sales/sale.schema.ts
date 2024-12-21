import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from '../products/product.schema';

export type SaleDocument = Sale & Document;

@Schema()
export class Sale {
  @Prop({ required: true })
  buyerName: string;

  @Prop({ required: true })
  buyerPhone: string;

  @Prop({ required: true })
  saleType: 'atacado' | 'varejo';

  @Prop({ required: true })
  paymentType: 'dinheiro' | 'cartao' | 'pix';

  @Prop({ required: false })
  installments: number;

  @Prop({ required: true })
  products: Product[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  saleDate: Date;

  // Adicionando a propriedade paymentConfirmed
  @Prop({ default: false })
  paymentConfirmed: boolean;
}

export const SaleSchema = SchemaFactory.createForClass(Sale);
