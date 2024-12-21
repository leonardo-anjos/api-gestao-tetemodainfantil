import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/api-gestao-tetemodainfantil'),
    ProductsModule,
    SalesModule,
  ],
  providers: [WhatsappService],
})
export class AppModule {}
