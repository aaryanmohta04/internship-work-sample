// src/customer-business-model/customer-business-model.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerBusinessModelService } from './customer-business-model.service';
import { CustomerBusinessModelController } from './customer-business-model.controller';
import { CustomerBusinessModel } from './customer-business-model.entity';
import { Customer } from 'src/customer/customer.entity';
import { BusinessModel } from 'src/business-model/business-model.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerBusinessModel, Customer, BusinessModel]),
  ],
  controllers: [CustomerBusinessModelController],
  providers: [CustomerBusinessModelService],
})
export class CustomerBusinessModelModule {}
