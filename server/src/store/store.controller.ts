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
import { StoreService } from './store.service';
import { Store } from './store.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('stores')
@UseGuards(RolesGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('searchQuery') searchQuery = '',
    @Query('discontinued') discontinued = 'false',
  ): Promise<{ data: Store[]; totalRows: number }> {
    const discontinuedBoolean = discontinued === 'true';
    return this.storeService.findAll(
      offset,
      limit,
      searchQuery,
      discontinuedBoolean,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Store | null> {
    return this.storeService.findOne(+id);
  }

  @Post()
  create(@Body() store: Store): Promise<Store> {
    return this.storeService.create(store);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() store: Store): Promise<Store | null> {
    return this.storeService.update(+id, store);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.storeService.remove(+id);
  }
}
