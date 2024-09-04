import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CustomerGroup } from './customer-group.entity';

@Controller('customer-groups')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) {}

  @Post()
  create(@Body() customerGroupData: CustomerGroup, userId: number) {
    return this.customerGroupService.create(customerGroupData, userId);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('discontinued') discontinued: string,
  ) {
    console.log(offset, ', ', limit);
    return this.customerGroupService.findAll(
      offset,
      limit,
      search,
      discontinued,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerGroupService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() customerGroupData: CustomerGroup,
    userId: number,
  ) {
    return this.customerGroupService.update(id, customerGroupData, userId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customerGroupService.remove(id);
  }
}
