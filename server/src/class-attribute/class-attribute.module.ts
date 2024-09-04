import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassAttributeService } from './class-attribute.service';
import { ClassAttributeController } from './class-attribute.controller';
import { ClassAttribute } from './class-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassAttribute])],
  providers: [ClassAttributeService],
  controllers: [ClassAttributeController],
})
export class ClassAttributeModule {}
