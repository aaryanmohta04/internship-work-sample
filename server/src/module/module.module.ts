import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { Module as ModuleEntity } from './module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  providers: [ModuleService],
  controllers: [ModuleController],
})
export class ModuleModule {}
