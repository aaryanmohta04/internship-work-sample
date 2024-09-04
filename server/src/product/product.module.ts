// src/product/product.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { BrandModule } from '../brand/brand.module';
import { ModelModule } from '../model/model.module';
import { ClassModule } from '../class/class.module';
import { Product } from './product.entity';
import { BaseModule } from 'src/base/base.module';
import { S3Module } from 'src/s3/s3.module';
import { ProductGalleryModule } from 'src/product-gallery/product-gallery.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductGalleryModule,
    BrandModule,
    S3Module,
    ModelModule,
    ClassModule,
    BaseModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
