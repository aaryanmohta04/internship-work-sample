import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from './logger.service';
import { Log } from './log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
