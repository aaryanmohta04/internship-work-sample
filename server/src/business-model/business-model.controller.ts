// src/business-model/business-model.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { BusinessModelService } from './business-model.service';
import { BusinessModel } from './business-model.entity';

@Controller('business-models')
export class BusinessModelController {
  constructor(private readonly businessModelService: BusinessModelService) {}

  @Get()
  findAll(): Promise<BusinessModel[]> {
    return this.businessModelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<BusinessModel | null> {
    return this.businessModelService.findOne(id);
  }

  @Post()
  create(@Body() businessModel: BusinessModel): Promise<BusinessModel> {
    return this.businessModelService.create(businessModel);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() businessModel: BusinessModel,
  ): Promise<BusinessModel | null> {
    return this.businessModelService.update(id, businessModel);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.businessModelService.remove(id);
  }
}
