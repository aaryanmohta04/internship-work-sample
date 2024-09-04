import { Controller, Get, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { PopularBrandService } from './popular-brand.service';
import { PopularBrand } from './popular-brand.entity';
import { Brand } from 'src/brand/brand.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('popular-brands')
export class PopularBrandController {
  constructor(private popularBrandService: PopularBrandService) {}

  @Get()
  async findAll(): Promise<PopularBrand[]> {
    return this.popularBrandService.findAll();
  }

  @Post()
  async create(@Body('brandId') brandId: number): Promise<PopularBrand> {
    return this.popularBrandService.create(brandId);
  }

  @Post('delete')
  async remove(@Body('id') id: number): Promise<void> {
    return this.popularBrandService.remove(id);
  }

  @Put('order')
  async updateOrder(
    @Body() popularBrands: { brand: Brand; order: number }[],
  ): Promise<void> {
    await this.popularBrandService.update(popularBrands);
  }
}
