import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './class.entity';
import { ClassAttribute } from 'src/class-attribute/class-attribute.entity';
import { Attribute } from 'src/attribute/attribute.entity';
import { BaseModule } from 'src/base/base.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, ClassAttribute, Attribute]),
    BaseModule,
  ],
  providers: [ClassService],
  controllers: [ClassController],
})
export class ClassModule {}
