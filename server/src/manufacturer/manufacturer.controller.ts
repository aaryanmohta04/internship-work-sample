// eslint-disable-next-line prettier/prettier
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Res,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('manufacturers')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}
  @Get()
  findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('searchQuery') searchQuery = '',
    @Query('discontinued') discontinued = 'false',
    @Query('active') status = '',
  ): Promise<{ data: Manufacturer[]; totalRows: number }> {
    const discontinuedBoolean = discontinued === 'true';
    return this.manufacturerService.findAll(
      offset,
      limit,
      searchQuery,
      discontinuedBoolean,
      status,
    );
  }

  @Get('selection')
  async findManufacturersForSelection(): Promise<Manufacturer[]> {
    return this.manufacturerService.findManufacturersForSelection();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerService.findOne(+id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return manufacturer;
  }

  @Post()
  create(@Body() manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerService.create(manufacturer);
  }

  @Patch(':id')
  // eslint-disable-next-line prettier/prettier
  async update(
    @Param('id') id: string,
    @Body() manufacturer: Manufacturer,
  ): Promise<Manufacturer> {
    // eslint-disable-next-line prettier/prettier
    const updatedManufacturer = await this.manufacturerService.update(
      +id,
      manufacturer,
    );
    if (!updatedManufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return updatedManufacturer;
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const manufacturer = await this.manufacturerService.findOne(+id);
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with ID ${id} not found`);
    }
    return this.manufacturerService.remove(+id);
  }

  @Get('export/csv')
  async exportToCSV(@Res() res: Response) {
    const csv = await this.manufacturerService.exportToCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('manufacturers.csv');
    res.send(csv);
  }
}
