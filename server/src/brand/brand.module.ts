import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { Brand } from './brand.entity';
import { Class } from '../class/class.entity'; // Assuming Class entity is in the class folder
import { BrandClass } from 'src/brand-class/brand-class.entity';
import { Manufacturer } from 'src/manufacturer/manufacturer.entity';
import { BaseModule } from 'src/base/base.module';
import { Model } from 'src/model/model.entity';
import { RoleModuleModule } from 'src/role-module/role-module.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand, Class, BrandClass, Manufacturer, Model]),
    BaseModule, RoleModuleModule
  ],
  providers: [BrandService],
  controllers: [BrandController],
})
export class BrandModule {}
