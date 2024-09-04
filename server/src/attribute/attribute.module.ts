import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { Attribute } from './attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Attribute])],
  providers: [AttributeService],
  controllers: [AttributeController],
})
export class AttributeModule {}
