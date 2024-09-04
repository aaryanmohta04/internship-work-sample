import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PopularBrand } from './popular-brand.entity';
import { Brand } from 'src/brand/brand.entity';

@Injectable()
export class PopularBrandService {
  constructor(
    @InjectRepository(PopularBrand)
    private popularBrandRepository: Repository<PopularBrand>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}

  async findAll(): Promise<PopularBrand[]> {
    return this.popularBrandRepository.find({
      order: { order: 'ASC' },
      relations: ['brand'],
      where: { isDelete: false },
    });
  }

  async create(id: number): Promise<PopularBrand> {
    const brand = await this.brandRepository.findOne({
      where: { id },
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    const popularBrands = await this.findAll();
    const newOrder = popularBrands.length + 1;

    const newPopularBrand = this.popularBrandRepository.create({
      brand,
      order: newOrder,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await this.popularBrandRepository.save(newPopularBrand);
    return newPopularBrand;
  }

  async remove(id: number): Promise<void> {
    const popularBrand = await this.popularBrandRepository.findOne({
      where: { id },
    });

    if (popularBrand) {
      popularBrand.isDelete = true;
      await this.popularBrandRepository.save(popularBrand);
    }
  }

  async update(
    popularBrands: { brand: Brand; order: number }[],
  ): Promise<void> {
    for (const { brand, order } of popularBrands) {
      await this.popularBrandRepository.update({ brand }, { order });
    }
  }
}
