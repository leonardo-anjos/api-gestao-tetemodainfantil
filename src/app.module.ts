import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [ProductsModule, SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
