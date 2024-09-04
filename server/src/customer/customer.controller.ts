// src/customer/customer.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('searchQuery') searchQuery = '',
    @Query('active') active: boolean,
  ): Promise<{ data: Customer[]; totalRows: number }> {
    return this.customerService.findAll(offset, limit, searchQuery, active);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Customer | null> {
    return this.customerService.findOne(id);
  }

  @Post()
  create(@Body() customer: Customer): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() customer: Customer,
  ): Promise<Customer | null> {
    return this.customerService.update(id, customer);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.customerService.remove(id);
  }
}
