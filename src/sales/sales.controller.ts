import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
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

  @Delete(':id')
  cancel(@Param('id') id: string): Promise<void> {
    return this.salesService.cancelSale(id);
  }
  
  /**
   * REPORTS FROM SALES 
   */

  @Get('grouped-by-type')
  async getSalesGroupedByType() {
    return this.salesService.getSalesGroupedByType();
  }

  @Get('product-report')
  async getSalesReportByProduct() {
    return this.salesService.getSalesReportByProduct();
  }

  @Get('payment-type')
  async getSalesByPaymentType() {
    return this.salesService.getSalesByPaymentType();
  }
}
