import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { ModelClassService } from './model-class.service';

@Controller('model-classes')
export class ModelClassController {
  constructor(private readonly modelClassService: ModelClassService) {}

  @Post()
  create(@Body() createModelClassDto: { modelId: number; classId: number }) {
    return this.modelClassService.create(
      createModelClassDto.modelId,
      createModelClassDto.classId,
    );
  }

  @Get()
  findAll() {
    return this.modelClassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modelClassService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modelClassService.remove(id);
  }
}
