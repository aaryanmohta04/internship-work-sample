import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('active') active: string,
  ): Promise<{ data: Role[]; totalRows: number }> {
    return this.roleService.findAll(offset, limit, search, active);
  }

  @Get('selection')
  async findRolesForSelection(): Promise<Role[]> {
    return this.roleService.findRolesForSelection();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() role: Role) {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
