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
import { ClassService } from './class.service';
import { Class } from './class.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('classes')
@UseGuards(RolesGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ data: Class[]; totalRows: number }> {
    return this.classService.findAll(offset, limit);
  }

  @Get('selection')
  async findClassesForSelection(): Promise<Class[]> {
    return this.classService.findClassesForSelection();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Class> {
    return this.classService.findOne(+id);
  }

  @Post()
  create(@Body() classEntity: Class): Promise<Class> {
    return this.classService.create(classEntity);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() classEntity: Class): Promise<Class> {
    return this.classService.update(+id, classEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.classService.remove(+id);
  }
}
