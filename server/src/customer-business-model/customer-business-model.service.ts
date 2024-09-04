// src/customer-business-model/customer-business-model.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerBusinessModel } from './customer-business-model.entity';

@Injectable()
export class CustomerBusinessModelService {
  constructor(
    @InjectRepository(CustomerBusinessModel)
    private customerBusinessModelRepository: Repository<CustomerBusinessModel>,
  ) {}

  findAll(): Promise<CustomerBusinessModel[]> {
    return this.customerBusinessModelRepository.find();
  }

  findOne(
    customerId: number,
    businessModelId: number,
  ): Promise<CustomerBusinessModel | null> {
    return this.customerBusinessModelRepository.findOne({
      where: {
        customer: { id: customerId },
        businessModel: { id: businessModelId },
      },
    });
  }

  create(
    customerBusinessModel: CustomerBusinessModel,
  ): Promise<CustomerBusinessModel> {
    return this.customerBusinessModelRepository.save(customerBusinessModel);
  }

  async remove(customerId: number, businessModelId: number): Promise<void> {
    await this.customerBusinessModelRepository.delete({
      customer: { id: customerId },
      businessModel: { id: businessModelId },
    });
  }
}
