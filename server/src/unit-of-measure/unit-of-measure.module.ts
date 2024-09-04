import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitOfMeasure } from './unit-of-measure.entity';
import { UnitOfMeasureService } from './unit-of-measure.service';
import { UnitOfMeasureController } from './unit-of-measure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UnitOfMeasure])],
  providers: [UnitOfMeasureService],
  controllers: [UnitOfMeasureController],
})
export class UnitOfMeasureModule {}
