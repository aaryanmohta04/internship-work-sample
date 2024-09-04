import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { BrandClass } from 'src/brand-class/brand-class.entity';
import { Class } from 'src/class/class.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { Model } from 'src/model/model.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    private baseService: BaseService<Brand>,
    @InjectRepository(BrandClass)
    private brandClassRepository: Repository<BrandClass>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
  ): Promise<{ data: Brand[]; totalRows: number }> {
    const brands = this.brandRepository
      .createQueryBuilder('brand')
      .leftJoinAndSelect('brand.manufacturer', 'manufacturer')
      .select([
        'brand.id',
        'brand.name',
        'manufacturer.id',
        'manufacturer.name',
      ])
      .where('brand.discontinued = :discontinued', { discontinued: false })
      .orderBy('brand.name', 'ASC');

    const [data, totalRows] = await this.baseService.getManyAndCount(
      brands,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  async findModelsByBrandId(brandId: number): Promise<Model[] | null> {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    return this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.brand', 'brand')
      .where('model.brand.id = :brandId', { brandId })
      .getMany();
  }

  async findManufacturersByBrandId(
    brandId: number,
  ): Promise<Manufacturer | null> {
    const brand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${brandId} not found`);
    }
    return this.manufacturerRepository.findOne({
      where: { id: brand.manufacturerId },
    });
  }

  async findBrandsForSelection(): Promise<Brand[]> {
    return this.brandRepository
      .createQueryBuilder('brand')
      .select(['brand.id', 'brand.name'])
      .getMany();
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: ['manufacturer', 'brandClasses', 'brandClasses.classEntity'],
    });

    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    return brand;
  }

  async create(brandData: Partial<Brand>, updatedBy: string): Promise<Brand> {
    const brand = this.brandRepository.create(brandData);
    brand.updatedBy = updatedBy;
    const savedBrand = await this.brandRepository.save(brand);

    if (brandData.classes) {
      await this.saveBrandClasses(savedBrand, brandData.classes);
    }

    return savedBrand;
  }

  async update(
    id: number,
    brandData: Partial<Brand>,
    updatedBy: string,
  ): Promise<Brand> {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }

    Object.assign(brand, brandData);
    brand.updatedBy = updatedBy;
    const savedBrand = await this.brandRepository.save(brand);

    if (brandData.classes) {
      await this.saveBrandClasses(savedBrand, brandData.classes);
    }

    return savedBrand;
  }

  async remove(id: number): Promise<void> {
    const brand = await this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID ${id} not found`);
    }
    await this.brandRepository.remove(brand);
  }

  private async saveBrandClasses(
    savedBrand: Brand,
    classIds: Class[],
  ): Promise<void> {
    // Delete existing brand-class associations
    await this.brandClassRepository.delete({ brand: { id: savedBrand.id } });

    // Create new brand-class associations
    for (const classId of classIds) {
      const brandClass = new BrandClass();
      brandClass.brand = savedBrand;
      const classEntity = await this.classRepository.findOne({
        where: { id: classId.id },
      });

      if (!brandClass.brand || !classEntity) {
        throw new NotFoundException(`Class with ID ${classId} not found`);
      }

      brandClass.classEntity = classEntity;
      brandClass.updatedDate = new Date();
      await this.brandClassRepository.save(brandClass);
    }
  }
}
