import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { WhatsappService } from './whatsapp/whatsapp.service';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProductsModule,
    SalesModule,
  ],
  providers: [WhatsappService],
})
export class AppModule {}
