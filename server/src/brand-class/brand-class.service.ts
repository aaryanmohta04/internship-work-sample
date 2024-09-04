import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandClass } from './brand-class.entity';

@Injectable()
export class BrandClassService {
  constructor(
    @InjectRepository(BrandClass)
    private readonly brandClassRepository: Repository<BrandClass>,
  ) {}

  findAll(): Promise<BrandClass[]> {
    return this.brandClassRepository.find({
      relations: ['brand', 'classEntity'],
    });
  }

  async findOne(id: number): Promise<BrandClass> {
    const brandClass = await this.brandClassRepository
      .createQueryBuilder('brandClass')
      .leftJoinAndSelect('brandClass.brand', 'brandClass.brand')
      .select(['brandClass.brand.name'])
      .where('brand.id = :id', { id })
      .getOne();

    if (!brandClass) {
      throw new NotFoundException(`BrandClass with ID ${id} not found`);
    }

    return brandClass;
  }

  async create(brandClass: Partial<BrandClass>): Promise<BrandClass> {
    const newBrandClass = this.brandClassRepository.create(brandClass);
    return this.brandClassRepository.save(newBrandClass);
  }

  async update(
    id: number,
    brandClass: Partial<BrandClass>,
  ): Promise<BrandClass> {
    await this.brandClassRepository.update(id, brandClass);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.brandClassRepository.delete(id);
  }
}
