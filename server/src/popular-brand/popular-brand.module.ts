import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopularBrand } from './popular-brand.entity';
import { PopularBrandService } from './popular-brand.service';
import { PopularBrandController } from './popular-brand.controller';
import { Brand } from 'src/brand/brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopularBrand, Brand])],
  providers: [PopularBrandService],
  controllers: [PopularBrandController],
})
export class PopularBrandModule {}
