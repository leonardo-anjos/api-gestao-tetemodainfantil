import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>, // Aqui é onde injetamos o Model do Mongoose
  ) {}

  // Criar produto
  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // Listar todos os produtos
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Filtrar produtos por diferentes critérios
  async filterProducts(filters: any): Promise<Product[]> {
    return this.productModel.find(filters).exec();
  }

  // Atualizar a quantidade de estoque
  async updateStock(productId: string, updateDto: { stock: number }): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Atualiza a quantidade no estoque
    product.stock = updateDto.stock;
    return product.save();
  }
}
