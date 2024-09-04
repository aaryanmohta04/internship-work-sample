import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attribute } from './attribute.entity';

@Injectable()
export class AttributeService {
  constructor(
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async findAll(): Promise<Attribute[]> {
    return this.attributeRepository.find();
  }

  async findOne(id: number): Promise<Attribute> {
    const attribute = await this.attributeRepository.findOne({ where: { id } });
    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${id} not found`);
    }
    return attribute;
  }

  async create(attribute: Attribute): Promise<Attribute> {
    return this.attributeRepository.save(attribute);
  }

  async update(id: number, attribute: Attribute): Promise<Attribute> {
    await this.attributeRepository.update(id, attribute);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.attributeRepository.delete(id);
  }
}
