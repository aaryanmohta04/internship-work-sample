import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShippingMethod } from './shipping-method.entity';

@Injectable()
export class ShippingMethodService {
  constructor(
    @InjectRepository(ShippingMethod)
    private readonly shippingMethodRepository: Repository<ShippingMethod>,
  ) {}

  async findAll(): Promise<ShippingMethod[]> {
    return this.shippingMethodRepository.find();
  }

  async findOne(id: number): Promise<ShippingMethod | null> {
    return this.shippingMethodRepository.findOne({ where: { id } });
  }

  async create(name: string): Promise<ShippingMethod> {
    const shippingMethod = this.shippingMethodRepository.create({ name });
    return this.shippingMethodRepository.save(shippingMethod);
  }

  async update(id: number, name: string): Promise<ShippingMethod | null> {
    await this.shippingMethodRepository.update(id, { name });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.shippingMethodRepository.delete(id);
  }
}
