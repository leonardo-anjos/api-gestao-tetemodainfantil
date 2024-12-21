import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>, 
  ) {}

  async create(createProductDto: any): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async filterProducts(filters: any): Promise<Product[]> {
    return this.productModel.find(filters).exec();
  }

  async updateStock(productId: string, updateDto: { stock: number }): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.stock = updateDto.stock;
    return product.save();
  }

  async updateProduct(productId: string, updateDto: any): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(productId, updateDto, {
      new: true, // Retorna o documento atualizado
    });
    if (!updatedProduct) {
      throw new Error('Product not found');
    }
    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(productId);
    if (!product) {
      throw new Error('Product not found');
    }
  }

  async adjustStock(productId: string, quantity: number): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    product.stock += quantity; // Ajusta o estoque (quantidade pode ser positiva ou negativa)
    return product.save();
  }

  async checkProductAvailability(productId: string, quantity: number): Promise<boolean> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    return product.stock >= quantity; // Verifica se o estoque é suficiente
  }

  async findProductByNameOrCollection(searchQuery: string): Promise<Product[]> {
    return this.productModel.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { collection: { $regex: searchQuery, $options: 'i' } }
      ]
    }).exec();
  }
}
