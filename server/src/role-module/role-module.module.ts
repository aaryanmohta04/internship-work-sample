import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModuleService } from './role-module.service';
import { RoleModuleController } from './role-module.controller';
import { RoleModule } from './role-module.entity';
import { Role } from '../role/role.entity';
import { Module as ModuleEntity } from '../module/module.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([RoleModule, Role, ModuleEntity])],
  providers: [RoleModuleService],
  controllers: [RoleModuleController],
  exports: [RoleModuleService],
})
export class RoleModuleModule {}
