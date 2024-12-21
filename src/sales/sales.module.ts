import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Sale, SaleSchema } from './sale.schema';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { ProductsModule } from '../products/products.module'; // Corrigido
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
    ProductsModule, 
  ],
  controllers: [SalesController],
  providers: [SalesService, WhatsappService],
})
export class SalesModule {}
