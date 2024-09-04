// src/business-model/business-model.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessModel } from './business-model.entity';

@Injectable()
export class BusinessModelService {
  constructor(
    @InjectRepository(BusinessModel)
    private businessModelRepository: Repository<BusinessModel>,
  ) {}

  findAll(): Promise<BusinessModel[]> {
    return this.businessModelRepository.find();
  }

  findOne(id: number): Promise<BusinessModel | null> {
    return this.businessModelRepository.findOne({ where: { id } });
  }

  create(businessModel: BusinessModel): Promise<BusinessModel> {
    return this.businessModelRepository.save(businessModel);
  }

  async update(
    id: number,
    businessModel: BusinessModel,
  ): Promise<BusinessModel | null> {
    await this.businessModelRepository.update(id, businessModel);
    return this.businessModelRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.businessModelRepository.delete(id);
  }
}
