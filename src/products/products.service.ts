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

  async updateProduct(id: string, updateDto: Partial<Product>): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateDto, { new: true });
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

  async groupProductsByColorAndSize(name: string) {
    const result = await this.productModel.aggregate([
      { $match: { name: { $regex: name, $options: 'i' } } },
      {
        $group: {
          _id: { color: "$color", size: "$size" },
          totalStock: { $sum: "$stock" },
        }
      },
      {
        $project: {
          _id: 0,
          color: "$_id.color",
          size: "$_id.size",
          totalStock: 1,
        }
      }
    ]);

    return result;
  }
}
