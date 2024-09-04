import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), BaseModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
