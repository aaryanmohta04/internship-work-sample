// src/customer-business-model/customer-business-model.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CustomerBusinessModelService } from './customer-business-model.service';
import { CustomerBusinessModel } from './customer-business-model.entity';

@Controller('customer-business-models')
export class CustomerBusinessModelController {
  constructor(
    private readonly customerBusinessModelService: CustomerBusinessModelService,
  ) {}

  @Get()
  findAll(): Promise<CustomerBusinessModel[]> {
    return this.customerBusinessModelService.findAll();
  }

  @Get(':customerId/:businessModelId')
  findOne(
    @Param('customerId') customerId: number,
    @Param('businessModelId') businessModelId: number,
  ): Promise<CustomerBusinessModel | null> {
    return this.customerBusinessModelService.findOne(
      customerId,
      businessModelId,
    );
  }

  @Post()
  create(
    @Body() customerBusinessModel: CustomerBusinessModel,
  ): Promise<CustomerBusinessModel> {
    return this.customerBusinessModelService.create(customerBusinessModel);
  }

  @Delete(':customerId/:businessModelId')
  remove(
    @Param('customerId') customerId: number,
    @Param('businessModelId') businessModelId: number,
  ): Promise<void> {
    return this.customerBusinessModelService.remove(
      customerId,
      businessModelId,
    );
  }
}
