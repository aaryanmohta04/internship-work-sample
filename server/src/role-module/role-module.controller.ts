import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleModuleService } from './role-module.service';
import { RoleModule } from './role-module.entity';

@Controller('role-modules')
export class RoleModuleController {
  constructor(private readonly roleModuleService: RoleModuleService) {}

  @Get()
  async findModulesWithRolePermissions(): Promise<RoleModule[]> {
    return this.roleModuleService.findModulesWithRolePermissions();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RoleModule | null> {
    return this.roleModuleService.findOne(+id);
  }

  @Post()
  create(@Body() roleModule: RoleModule): Promise<RoleModule> {
    return this.roleModuleService.create(roleModule);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() roleModule: Partial<RoleModule>,
  ): Promise<RoleModule | null> {
    return this.roleModuleService.update(+id, roleModule);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.roleModuleService.remove(+id);
  }
}
