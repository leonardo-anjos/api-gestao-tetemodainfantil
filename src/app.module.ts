import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { WhatsappService } from './whatsapp/whatsapp.service';

@Module({
  imports: [ProductsModule, SalesModule],
  providers: [WhatsappService],
})
export class AppModule {}
