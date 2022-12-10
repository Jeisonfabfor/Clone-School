import { Injectable, NotFoundException } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  // Get all products
  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  // Get a single Product
  async getProduct(productID: string): Promise<Product> {
    return this.productModel.findById(productID);
  }

  // Create a single product
  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productModel.create(createProductDTO);
  }

  // Delete Product
  async deleteProduct(productID: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productID);
    return deletedProduct;
  }

  // Put a single product
  async updateProduct(
    productID: string,
    createProductDTO: CreateProductDTO,
  ): Promise<Product> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productID,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }

  userNotFound() {
    throw new NotFoundException('Product does not exist!');
  }
}
