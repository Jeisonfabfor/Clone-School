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

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Get Products
  @Get('/')
  @ApiTags('Products')
  async getProducts() {
    return this.productService.getProducts();
  }

  // Get single product
  @Get('/:productID')
  @ApiTags('Products')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json(product);
  }

  // Create New Product
  @Post('/create')
  @ApiTags('Products')
  @ApiCreatedResponse({ description: 'New Product' })
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return {
      message: 'Product Successfully Created',
      product,
    };
  }

  // Delete Product
  @Delete('/delete')
  @ApiTags('Products')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Successfully',
      productDeleted,
    });
  }

  // Update Product
  @Put('/update')
  @ApiTags('Products')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );
    if (!updatedProduct) this.productService.userNotFound();
    return res.status(HttpStatus.OK).json({
      message: MessageResponses.productUpdated,
      updatedProduct,
    });
  }
}

export enum MessageResponses {
  productMotFound = 'Product does not exist!',
  productUpdated = 'Product Updated Successfully',
}
