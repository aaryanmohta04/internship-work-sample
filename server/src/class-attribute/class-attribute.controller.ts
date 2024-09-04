import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClassAttributeService } from './class-attribute.service';
import { ClassAttribute } from './class-attribute.entity';

@Controller('class-attributes')
export class ClassAttributeController {
  constructor(private readonly classAttributeService: ClassAttributeService) {}

  @Get()
  findAll(): Promise<ClassAttribute[]> {
    return this.classAttributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ClassAttribute> {
    return this.classAttributeService.findOne(+id);
  }

  @Post()
  create(@Body() classAttribute: ClassAttribute): Promise<ClassAttribute> {
    return this.classAttributeService.create(classAttribute);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() classAttribute: ClassAttribute,
  ): Promise<ClassAttribute> {
    return this.classAttributeService.update(+id, classAttribute);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classAttributeService.remove(+id);
  }
}
