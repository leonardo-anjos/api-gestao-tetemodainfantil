import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.schema';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: any): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: any): Promise<Sale> {
    return this.salesService.updateSale(id, updateSaleDto);
  }

  @Delete(':id')
  cancel(@Param('id') id: string): Promise<void> {
    return this.salesService.cancelSale(id);
  }

  @Get('type/:saleType')
  findSalesByType(@Param('saleType') saleType: 'atacado' | 'varejo'): Promise<Sale[]> {
    return this.salesService.findSalesByType(saleType);
  }

  @Get('date/:date')
  findSalesByDate(@Param('date') date: string): Promise<Sale[]> {
    return this.salesService.findSalesByDate(date);
  }

  @Get('total')
  getTotalSales(): Promise<number> {
    return this.salesService.getTotalSales();
  }

  @Put('confirm-payment/:id')
  confirmPayment(@Param('id') id: string): Promise<Sale> {
    return this.salesService.confirmPayment(id);
  }

  @Post('report')
  sendReport(@Body('buyerPhone') buyerPhone: string): Promise<void> {
    return this.salesService.sendSalesReport(buyerPhone);
  }
}
