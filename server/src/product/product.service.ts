// src/product/product.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { BaseService } from 'src/base/base.service';
import { ProductGallery } from 'src/product-gallery/product-gallery.entity';
import { ProductGalleryService } from 'src/product-gallery/product-gallery.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private ProductGalleryService: ProductGalleryService,
    private baseService: BaseService<Product>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    searchQuery: string,
  ): Promise<{ data: Product[]; totalRows: number }> {
    const products = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('brand.manufacturer', 'manufacturer')
      .leftJoinAndSelect('product.model', 'model')
      .leftJoinAndSelect('product.classEntity', 'classEntity')
      .select([
        'product.id',
        'product.name',
        'brand.id',
        'brand.name',
        'manufacturer.id',
        'manufacturer.name',
        'model.id',
        'model.name',
        'classEntity.id',
        'classEntity.name',
      ])
      .orderBy('product.name', 'ASC');
    if (searchQuery) {
      products.andWhere('product.name LIKE :name', {
        name: `%${searchQuery}%`,
      });
    }
    const [data, totalRows] = await this.baseService.getManyAndCount(
      products,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('brand.manufacturer', 'manufacturer')
      .leftJoinAndSelect('product.model', 'model')
      .leftJoinAndSelect('product.classEntity', 'classEntity')
      .select([
        'product.id',
        'product.name',
        'product.variety',
        'product.manufacturerItemNumber',
        'product.price',
        'product.isPromoItem',
        'product.promotionCode',
        'product.measure',
        'product.manufacturerFacility',
        'product.attributes',
        'brand.id',
        'brand.name',
        'manufacturer.id',
        'manufacturer.name',
        'model.id',
        'model.name',
        'classEntity.id',
        'classEntity.name',
      ])
      .where('product.id = :id', { id })
      .getOne();

    return product || null;
  }

  async create(productData: any) {
    const product = await this.productRepository.save(productData.product);
    for (const gallery of productData.galleries) {
      const newGallery: ProductGallery = { ...gallery, productId: product.id };
      await this.ProductGalleryService.create(newGallery);
    }
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    productData: Partial<Product>,
  ): Promise<Product | null> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
