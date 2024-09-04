import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AccountTypeService } from './account-type.service';
import { AccountType } from './account-type.entity';

@Controller('account-type')
export class AccountTypeController {
  constructor(private readonly accountTypeService: AccountTypeService) {}

  @Get()
  findAll(): Promise<AccountType[]> {
    return this.accountTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AccountType> {
    return this.accountTypeService.findOne(+id);
  }

  @Post()
  create(@Body() accountType: AccountType): Promise<AccountType> {
    return this.accountTypeService.create(accountType);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() accountType: Partial<AccountType>,
  ): Promise<AccountType> {
    return this.accountTypeService.update(+id, accountType);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.accountTypeService.remove(+id);
  }
}
