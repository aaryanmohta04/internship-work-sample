import {
  Controller,
  Get,
  Query,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UnitOfMeasureService } from './unit-of-measure.service';
import { UnitOfMeasure } from './unit-of-measure.entity';

@Controller('unit-of-measure')
export class UnitOfMeasureController {
  constructor(private readonly unitOfMeasureService: UnitOfMeasureService) {}

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('searchQuery') searchQuery = '',
    @Query('discontinued') discontinued: boolean,
  ): Promise<{ data: UnitOfMeasure[]; totalRows: number }> {
    return this.unitOfMeasureService.findAll(
      offset,
      limit,
      searchQuery,
      discontinued,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UnitOfMeasure | null> {
    return this.unitOfMeasureService.findOne(id);
  }

  @Get('/product/:id')
  findByProductId(@Param('id') id: number) {
    return this.unitOfMeasureService.findByProductId(id);
  }

  @Post()
  create(@Body() unitOfMeasure: UnitOfMeasure): Promise<UnitOfMeasure> {
    return this.unitOfMeasureService.create(unitOfMeasure);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() unitOfMeasure: Partial<UnitOfMeasure>,
  ): Promise<UnitOfMeasure | null> {
    return this.unitOfMeasureService.update(id, unitOfMeasure);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.unitOfMeasureService.delete(id);
  }
}
