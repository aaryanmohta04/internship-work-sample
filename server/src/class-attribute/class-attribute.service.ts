import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassAttribute } from './class-attribute.entity';

@Injectable()
export class ClassAttributeService {
  constructor(
    @InjectRepository(ClassAttribute)
    private classAttributeRepository: Repository<ClassAttribute>,
  ) {}

  async findAll(): Promise<ClassAttribute[]> {
    return this.classAttributeRepository.find({
      relations: ['class', 'attribute'],
    });
  }

  async findOne(id: number): Promise<ClassAttribute> {
    const classAttribute = await this.classAttributeRepository.findOne({
      where: { id },
      relations: ['class', 'attribute'],
    });
    if (!classAttribute) {
      throw new NotFoundException(`ClassAttribute with ID ${id} not found`);
    }
    return classAttribute;
  }

  async create(classAttribute: ClassAttribute): Promise<ClassAttribute> {
    return this.classAttributeRepository.save(classAttribute);
  }

  async update(
    id: number,
    classAttribute: ClassAttribute,
  ): Promise<ClassAttribute> {
    await this.classAttributeRepository.update(id, classAttribute);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.classAttributeRepository.delete(id);
  }
}
