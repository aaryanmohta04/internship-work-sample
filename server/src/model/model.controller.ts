import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ModelService } from './model.service';
import { Model } from './model.entity';
import { Class } from 'src/class/class.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('models')
@UseGuards(RolesGuard)
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  create(@Body() createModelDto: Partial<Model>) {
    return this.modelService.create(createModelDto);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ data: Partial<Model>[]; totalRows: number }> {
    return this.modelService.findAll(offset, limit);
  }

  @Get('selection')
  async findForSelection(): Promise<Model[]> {
    return this.modelService.findForSelection();
  }

  @Get(':id/classes')
  async findClassesByModelId(@Param('id') id: number): Promise<Class[] | null> {
    return this.modelService.findClassesByModelId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.modelService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateModelDto: Partial<Model>) {
    return this.modelService.update(id, updateModelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.modelService.remove(id);
  }
}
