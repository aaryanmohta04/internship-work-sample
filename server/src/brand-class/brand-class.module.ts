import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandClass } from './brand-class.entity';
import { BrandClassService } from './brand-class.service';
import { BrandClassController } from './brand-class.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BrandClass])],
  providers: [BrandClassService],
  controllers: [BrandClassController],
  exports: [BrandClassService],
})
export class BrandClassModule {}
