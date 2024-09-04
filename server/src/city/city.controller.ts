import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CityService } from './city.service';
import { City } from './city.entity';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  async findAll(): Promise<City[]> {
    return this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<City | null> {
    return this.cityService.findOne(id);
  }

  @Post()
  async create(@Body() city: City): Promise<City> {
    return this.cityService.create(city);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() city: Partial<City>,
  ): Promise<void> {
    return this.cityService.update(id, city);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.cityService.remove(id);
  }
}
