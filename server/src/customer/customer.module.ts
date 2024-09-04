// src/customer/customer.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { User } from 'src/user/user.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, User]), BaseModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
