import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './sale.schema';
import { Product } from '../products/product.schema';
import { ProductsService } from '../products/products.service';

import axios from 'axios'; 
import { WhatsappService } from 'src/whatsapp/whatsapp.service';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    private readonly productsService: ProductsService, 
    private readonly whatsappService: WhatsappService, 
  ) {}

  async create(createSaleDto: any): Promise<Sale> {
    const totalAmount = createSaleDto.products.reduce(
      (sum, product: Product) => sum + product.price,
      0,
    );
    const sale = new this.saleModel({
      ...createSaleDto,
      totalAmount,
      saleDate: new Date(),
    });
    
    await sale.save();

    createSaleDto.products.forEach(async (product: Product) => {
      const productInStock = await this.productsService.updateStock(product.id, {
        stock: product.stock - 1, 
      });
    });

    this.whatsappService.sendThankYouMessage(createSaleDto.buyerPhone);

    return sale;
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }
}
