import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStore } from './user-store.entity';
import { UserStoreService } from './user-store.service';
import { UserStoreController } from './user-store.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserStore])],
  providers: [UserStoreService],
  controllers: [UserStoreController],
})
export class UserStoreModule {}
