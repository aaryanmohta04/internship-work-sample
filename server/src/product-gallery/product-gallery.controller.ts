import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductGalleryService } from './product-gallery.service';
import { ProductGallery } from './product-gallery.entity';

@Controller('product-gallery')
export class ProductGalleryController {
  constructor(private readonly productGalleryService: ProductGalleryService) {}

  @Post()
  create(
    @Body() productGalleryData: Partial<ProductGallery>,
    @Body() file: any,
  ) {
    return this.productGalleryService.create(productGalleryData);
  }

  @Get()
  findAll() {
    return this.productGalleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productGalleryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() productGalleryData: Partial<ProductGallery>,
  ) {
    return this.productGalleryService.update(+id, productGalleryData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productGalleryService.remove(+id);
  }
}
