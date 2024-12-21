import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: any): Promise<Product> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productsService.deleteProduct(id);
  }

  @Put(':id/stock')
  adjustStock(@Param('id') id: string, @Body('quantity') quantity: number): Promise<Product> {
    return this.productsService.adjustStock(id, quantity);
  }
  
  @Get('search/:query')
  findProductByNameOrCollection(@Param('query') query: string): Promise<Product[]> {
    return this.productsService.findProductByNameOrCollection(query);
  }
}
