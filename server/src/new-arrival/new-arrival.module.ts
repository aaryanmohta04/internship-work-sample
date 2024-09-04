import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewArrival } from './new-arrival.entity';
import { Model } from 'src/model/model.entity';
import { NewArrivalsService } from './new-arrival.service';
import { NewArrivalsController } from './new-arrival.controller';

@Module({
  imports: [TypeOrmModule.forFeature([NewArrival, Model])],
  providers: [NewArrivalsService],
  controllers: [NewArrivalsController],
})
export class NewArrivalsModule {}
