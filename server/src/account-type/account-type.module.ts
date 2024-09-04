import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountType } from './account-type.entity';
import { AccountTypeService } from './account-type.service';
import { AccountTypeController } from './account-type.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AccountType])],
  providers: [AccountTypeService],
  controllers: [AccountTypeController],
  exports: [AccountTypeService],
})
export class AccountTypeModule {}
