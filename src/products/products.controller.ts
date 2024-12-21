import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Criar um novo produto
  @Post()
  async create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }

  // Listar todos os produtos
  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  // Filtrar produtos por coleção, cor, tamanho
  @Get('filter')
  async filterProducts(@Body() filters: any) {
    return this.productsService.filterProducts(filters);
  }

  // Atualizar quantidade de produto em estoque
  @Put('update-stock/:id')
  async updateStock(@Param('id') productId: string, @Body() updateDto: { stock: number }) {
    return this.productsService.updateStock(productId, updateDto);
  }
}
