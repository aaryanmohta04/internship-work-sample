// src/product/product.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('searchQuery') searchQuery = '',
  ): Promise<{ data: Product[]; totalRows: number }> {
    return this.productService.findAll(offset, limit, searchQuery);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.productService.findById(id);
  }

  @Post()
  async create(@Body() productData: any) {
    return this.productService.create(productData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Partial<Product>,
  ): Promise<Product | null> {
    return this.productService.update(id, productData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.productService.delete(id);
  }
}
