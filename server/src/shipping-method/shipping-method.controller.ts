import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ShippingMethodService } from './shipping-method.service';

@Controller('shipping-methods')
export class ShippingMethodController {
  constructor(private readonly shippingMethodService: ShippingMethodService) {}

  @Get()
  findAll() {
    return this.shippingMethodService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.shippingMethodService.findOne(id);
  }

  @Post()
  create(@Body('name') name: string) {
    return this.shippingMethodService.create(name);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body('name') name: string) {
    return this.shippingMethodService.update(id, name);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.shippingMethodService.remove(id);
  }
}
