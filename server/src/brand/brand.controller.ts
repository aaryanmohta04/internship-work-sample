import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand } from './brand.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { Model } from 'src/model/model.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('brands')
@UseGuards(RolesGuard)
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ data: Brand[]; totalRows: number }> {
    return this.brandService.findAll(offset, limit);
  }

  @Get(':id/manufacturer')
  async findManufacturersByBrandId(
    @Param('id') id: number,
  ): Promise<Manufacturer | null> {
    return this.brandService.findManufacturersByBrandId(id);
  }

  @Get(':id/models')
  async findModelsByBrandId(@Param('id') id: number): Promise<Model[] | null> {
    return this.brandService.findModelsByBrandId(id);
  }

  @Get('selection')
  async findBrandsForSelection(): Promise<Brand[]> {
    return this.brandService.findBrandsForSelection();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Brand> {
    return this.brandService.findOne(id);
  }

  @Post()
  create(@Body() brandData: Partial<Brand>): Promise<Brand> {
    const updatedBy = '1'; // Replace with actual user context
    return this.brandService.create(brandData, updatedBy);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() brandData: Partial<Brand>,
  ): Promise<Brand> {
    const updatedBy = '1'; // Replace with actual user context
    return this.brandService.update(id, brandData, updatedBy);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.brandService.remove(id);
  }
}
