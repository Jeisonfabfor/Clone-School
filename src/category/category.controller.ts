import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';

import { CreateCategoryDTO } from './dto/category.dto';
import { CategoryService } from './category.service';

import { ApiTags } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  // Get Categories
  @Get('/')
  @ApiTags('Categories')
  async getCategories(@Res() res) {
    const categories = await this.categoryService.getCategories();
    return res.status(HttpStatus.OK).json(categories);
  }

  // Get single Category

  @Get('/:categoryID')
  @ApiTags('Categories')
  async getCategory(@Res() res, @Param('categoryID') categoryID) {
    const category = await this.categoryService.getCategory(categoryID);
    if (!category) throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json(category);
  }

  // Create New Category
  @Post('/create')
  @ApiTags('Categories')
  async createCategory(
    @Res() res,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ) {
    const category = await this.categoryService.createCategory(
      createCategoryDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Category Successfully Created',
      category,
    });
  }

  // Delete Category
  @Delete('/delete')
  @ApiTags('Categories')
  async deleteCategory(@Res() res, @Query('categoryID') categoryID) {
    const categoryDeleted = await this.categoryService.deleteCategory(
      categoryID,
    );
    if (!categoryDeleted)
      throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Deleted Successfully',
      categoryDeleted,
    });
  }

  // Update Category
  @Put('/update')
  @ApiTags('Categories')
  async updateCategory(
    @Res() res,
    @Body() createCategoryDTO: CreateCategoryDTO,
    @Query('categoryID') categoryID,
  ) {
    const updateCategory = await this.categoryService.updateCategory(
      categoryID,
      createCategoryDTO,
    );
    if (!updateCategory)
      throw new NotFoundException('Category does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Category Updated Successfully',
      updateCategory,
    });
  }
}
