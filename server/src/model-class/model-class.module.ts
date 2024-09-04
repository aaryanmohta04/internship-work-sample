import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelClass } from './model-class.entity';
import { ModelClassService } from './model-class.service';
import { ModelClassController } from './model-class.controller';
import { Model } from '../model/model.entity';
import { Class } from '../class/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelClass, Model, Class])],
  controllers: [ModelClassController],
  providers: [ModelClassService],
})
export class ModelClassModule {}
