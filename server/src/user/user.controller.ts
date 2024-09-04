import {
  Controller,
  Body,
  Put,
  Param,
  Get,
  Query,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @Query('role') role: number,
    @Query('active') active: boolean,
  ): Promise<{ data: User[]; totalRows: number }> {
    return this.userService.findAll(offset, limit, search, role, active);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Put('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() newData: Partial<User>) {
    const updatedUser = await this.userService.update(id, newData);
    return { message: 'User updated successfully', data: updatedUser };
  }
}
