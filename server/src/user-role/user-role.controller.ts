import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRole } from './user-role.entity';

@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  findAll(): Promise<UserRole[]> {
    return this.userRoleService.findAll();
  }

  @Get(':userId')
  findByUserId(@Param('userId') userId: number): Promise<UserRole[]> {
    return this.userRoleService.findByUserId(userId);
  }

  @Post()
  create(@Body() userRole: UserRole): Promise<UserRole> {
    return this.userRoleService.create(userRole);
  }

  @Delete(':userId/:roleId')
  remove(
    @Param('userId') userId: number,
    @Param('roleId') roleId: number,
  ): Promise<void> {
    return this.userRoleService.remove(userId, roleId);
  }
}
