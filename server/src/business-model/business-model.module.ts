// src/business-model/business-model.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModelService } from './business-model.service';
import { BusinessModelController } from './business-model.controller';
import { BusinessModel } from './business-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessModel])],
  controllers: [BusinessModelController],
  providers: [BusinessModelService],
})
export class BusinessModelModule {}
