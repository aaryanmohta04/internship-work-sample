import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { Attribute } from './attribute.entity';

@Controller('attributes')
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Get()
  findAll(): Promise<Attribute[]> {
    return this.attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Attribute> {
    return this.attributeService.findOne(+id);
  }

  @Post()
  create(@Body() attribute: Attribute): Promise<Attribute> {
    return this.attributeService.create(attribute);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() attribute: Attribute,
  ): Promise<Attribute> {
    return this.attributeService.update(+id, attribute);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.attributeService.remove(+id);
  }
}
