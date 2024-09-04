import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGalleryService } from './product-gallery.service';
import { ProductGalleryController } from './product-gallery.controller';
import { ProductGallery } from './product-gallery.entity';
import { Product } from '../product/product.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGallery, Product]), S3Module],
  controllers: [ProductGalleryController],
  providers: [ProductGalleryService],
  exports: [ProductGalleryService],
})
export class ProductGalleryModule {}
