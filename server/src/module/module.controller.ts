import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { Module } from './module.entity';

@Controller('modules')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @Get()
  findAll(): Promise<Module[]> {
    return this.moduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Module | null> {
    return this.moduleService.findOne(+id);
  }

  @Post()
  create(@Body() module: Module): Promise<Module> {
    return this.moduleService.create(module);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() module: Partial<Module>,
  ): Promise<Module | null> {
    return this.moduleService.update(+id, module);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.moduleService.remove(+id);
  }
}
