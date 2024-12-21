import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './sale.schema';
import { Product } from '../products/product.schema';
import { ProductsService } from '../products/products.service';
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

    // Atualiza o estoque após a venda
    createSaleDto.products.forEach(async (product: Product) => {
      await this.productsService.updateStock(product.id, {
        stock: product.stock - 1,
      });
    });

    // Mensagem personalizada
    const message = `Olá ${createSaleDto.buyerName}, agradecemos pela sua compra de ${createSaleDto.products.length} item(s) no valor total de R$${totalAmount}.`;
    await this.whatsappService.sendCustomMessage(createSaleDto.buyerPhone, message);

    return sale;
  }

  async findAll(): Promise<Sale[]> {
    return this.saleModel.find().exec();
  }

  // Novo: Atualiza uma venda existente
  async updateSale(saleId: string, updateSaleDto: any): Promise<Sale> {
    const updatedSale = await this.saleModel.findByIdAndUpdate(saleId, updateSaleDto, {
      new: true,
    });

    if (!updatedSale) {
      throw new Error('Sale not found');
    }

    return updatedSale;
  }

  // Novo: Cancela uma venda e ajusta o estoque
  async cancelSale(saleId: string): Promise<void> {
    const sale = await this.saleModel.findById(saleId);

    if (!sale) {
      throw new Error('Sale not found');
    }

    // Reverte o estoque dos produtos vendidos
    sale.products.forEach(async (product: Product) => {
      await this.productsService.updateStock(product.id, {
        stock: product.stock + 1, // Aumenta o estoque
      });
    });

    // Deleta a venda
    await this.saleModel.findByIdAndDelete(saleId);
  }

  // Novo: Filtra vendas por tipo (atacado ou varejo)
  async findSalesByType(saleType: 'atacado' | 'varejo'): Promise<Sale[]> {
    return this.saleModel.find({ saleType }).exec();
  }

  // Novo: Filtra vendas por data
  async findSalesByDate(date: string): Promise<Sale[]> {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1); // Próximo dia

    return this.saleModel
      .find({ saleDate: { $gte: startDate, $lt: endDate } })
      .exec();
  }

  // Novo: Calcula o total de vendas
  async getTotalSales(saleType?: 'atacado' | 'varejo'): Promise<number> {
    const sales = await this.saleModel
      .find(saleType ? { saleType } : {})
      .exec();

    return sales.reduce((total, sale) => total + sale.totalAmount, 0);
  }

  // Novo: Confirma o pagamento de uma venda
  async confirmPayment(saleId: string): Promise<Sale> {
    const sale = await this.saleModel.findById(saleId);
    if (!sale) {
      throw new Error('Sale not found');
    }

    sale.paymentConfirmed = true;
    return sale.save();
  }

  // Novo: Envia um resumo de vendas para um WhatsApp (pode ser um relatório)
  async sendSalesReport(buyerPhone: string): Promise<void> {
    const totalSales = await this.getTotalSales();
    const message = `Total Sales: $${totalSales.toFixed(2)}`;
    this.whatsappService.sendCustomMessage(buyerPhone, message);
  }
}
