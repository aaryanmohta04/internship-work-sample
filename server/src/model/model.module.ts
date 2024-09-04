import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './model.entity';
import { ModelService } from './model.service';
import { ModelController } from './model.controller';
import { Brand } from '../brand/brand.entity';
import { Class } from '../class/class.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Model, Brand, Class]), BaseModule],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
