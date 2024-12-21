import { Controller, Post, Body, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.schema';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async create(@Body() createSaleDto: any): Promise<Sale> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }
}
