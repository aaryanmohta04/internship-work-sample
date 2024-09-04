import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandClassService } from './brand-class.service';
import { BrandClass } from './brand-class.entity';

@Controller('brand-classes')
export class BrandClassController {
  constructor(private readonly brandClassService: BrandClassService) {}

  @Get()
  findAll(): Promise<BrandClass[]> {
    return this.brandClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<BrandClass> {
    return this.brandClassService.findOne(id);
  }

  @Post()
  create(@Body() brandClass: Partial<BrandClass>): Promise<BrandClass> {
    return this.brandClassService.create(brandClass);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() brandClass: Partial<BrandClass>,
  ): Promise<BrandClass> {
    return this.brandClassService.update(id, brandClass);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.brandClassService.remove(id);
  }
}
