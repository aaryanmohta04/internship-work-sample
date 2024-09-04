import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NewArrivalsService } from './new-arrival.service';
import { NewArrival } from './new-arrival.entity';
import { Model } from 'src/model/model.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('new-arrivals')
export class NewArrivalsController {
  constructor(private readonly newArrivalsService: NewArrivalsService) {}
  @Get()
  findAll() {
    return this.newArrivalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newArrivalsService.findOne(+id);
  }

  @Put('order')
  async update(
    @Body() newArrivals: { model: Model; order: number }[],
  ): Promise<void> {
    await this.newArrivalsService.update(newArrivals);
  }

  @Post()
  async create(@Body('modelId') modelId: number): Promise<NewArrival> {
    return this.newArrivalsService.create(modelId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newArrivalsService.remove(+id);
  }
}
