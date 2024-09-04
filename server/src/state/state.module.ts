import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './state.entity';
import { StateService } from './state.service';
import { StateController } from './state.controller';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StateService],
  controllers: [StateController],
})
export class StateModule {}
