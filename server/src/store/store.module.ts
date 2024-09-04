import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from './store.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), BaseModule],
  providers: [StoreService],
  controllers: [StoreController],
})
export class StoreModule {}
