import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGroupService } from './customer-group.service';
import { CustomerGroupController } from './customer-group.controller';
import { CustomerGroup } from './customer-group.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGroup]), BaseModule],
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService],
})
export class CustomerGroupModule {}
