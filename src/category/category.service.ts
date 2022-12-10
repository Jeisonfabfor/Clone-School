import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Category } from './interfaces/category.interface';
import { CreateCategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  // Get all Categories
  async getCategories(): Promise<Category[]> {
    const category = await this.categoryModel.find();
    return category;
  }

  // Get a single Category
  async getCategory(categoryID: string): Promise<Category> {
    const product = await this.categoryModel.findById(categoryID);
    return product;
  }

  // Create a single Category
  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDTO);
    return newCategory.save();
  }

  // Delete Category
  async deleteCategory(categoryID: string): Promise<any> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(
      categoryID,
    );
    return deletedCategory;
  }

  // Put a single Category
  async updateCategory(
    categoryID: string,
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(
      categoryID,
      createCategoryDTO,
      { new: true },
    );
    return updatedCategory;
  }
}
