import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductGallery } from './product-gallery.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProductGalleryService {
  constructor(
    @InjectRepository(ProductGallery)
    private readonly productGalleryRepository: Repository<ProductGallery>,
    private s3Service: S3Service,
  ) {}

  async create(
    productGalleryData: Partial<ProductGallery>,
    // file: any,
  ): Promise<ProductGallery> {
    const productGallery =
      this.productGalleryRepository.create(productGalleryData);
    // await this.s3Service.uploadFile(file.get('file'));
    return this.productGalleryRepository.save(productGallery);
  }

  async findAll(): Promise<ProductGallery[]> {
    return this.productGalleryRepository.find();
  }

  async findOne(id: number): Promise<ProductGallery> {
    const productGallery = await this.productGalleryRepository.findOne({
      where: { id },
    });
    if (!productGallery) {
      throw new NotFoundException(`ProductGallery with ID ${id} not found`);
    }
    return productGallery;
  }

  async update(
    id: number,
    productGalleryData: Partial<ProductGallery>,
  ): Promise<ProductGallery> {
    const productGallery = await this.findOne(id);
    Object.assign(productGallery, productGalleryData);
    return this.productGalleryRepository.save(productGallery);
  }

  async remove(id: number): Promise<void> {
    const productGallery = await this.findOne(id);
    await this.productGalleryRepository.remove(productGallery);
  }
}
