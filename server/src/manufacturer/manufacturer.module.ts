import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { Manufacturer } from './manufacturer.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer]), BaseModule],
  providers: [ManufacturerService],
  controllers: [ManufacturerController],
})
export class ManufacturerModule {}
