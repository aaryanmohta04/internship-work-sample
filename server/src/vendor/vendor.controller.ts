import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}
  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
  ): Promise<{ data: Vendor[]; totalRows: number }> {
    return this.vendorService.findAll(offset, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Vendor | null> {
    return this.vendorService.findOne(id);
  }

  @Post()
  async create(@Body() vendor: Vendor): Promise<Vendor> {
    return this.vendorService.create(vendor);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() vendor: Partial<Vendor>,
  ): Promise<void> {
    return this.vendorService.update(id, vendor);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.vendorService.remove(id);
  }
}
