import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Product } from './product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: any): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product> {
    return await this.productsService.findById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() updateDto: Partial<Product>): Promise<Product> {
    return this.productsService.updateProduct(id, updateDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @Get('group-by-color-size')
  async groupProducts(@Query('name') name: string) {
    return this.productsService.groupProductsByColorAndSize(name);
  }
}
