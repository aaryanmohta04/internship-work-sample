import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserStoreService } from './user-store.service';
import { UserStore } from './user-store.entity';

@Controller('user-stores')
export class UserStoreController {
  constructor(private readonly userStoreService: UserStoreService) {}

  @Get()
  findAll(): Promise<UserStore[]> {
    return this.userStoreService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number): Promise<UserStore[]> {
    return this.userStoreService.findByUserId(userId);
  }

  @Post()
  create(@Body() userStore: UserStore): Promise<UserStore> {
    return this.userStoreService.create(userStore);
  }

  @Delete(':userId/:storeId')
  remove(
    @Param('userId') userId: number,
    @Param('storeId') storeId: number,
  ): Promise<void> {
    return this.userStoreService.remove(userId, storeId);
  }
}
