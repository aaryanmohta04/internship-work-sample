import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async findAll(): Promise<Country[]> {
    return this.countryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Country | null> {
    return this.countryService.findOne(id);
  }

  @Post()
  async create(@Body() country: Country): Promise<Country> {
    return this.countryService.create(country);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() country: Partial<Country>,
  ): Promise<void> {
    return this.countryService.update(id, country);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.countryService.remove(id);
  }
}
