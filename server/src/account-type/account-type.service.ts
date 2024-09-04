import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountType } from './account-type.entity';

@Injectable()
export class AccountTypeService {
  constructor(
    @InjectRepository(AccountType)
    private accountTypeRepository: Repository<AccountType>,
  ) {}

  findAll(): Promise<AccountType[]> {
    return this.accountTypeRepository.find();
  }

  async findOne(id: number): Promise<AccountType> {
    const attribute = await this.accountTypeRepository.findOne({
      where: { id },
    });
    if (!attribute) {
      throw new NotFoundException(`Attribute with ID ${id} not found`);
    }
    return attribute;
  }

  create(accountType: AccountType): Promise<AccountType> {
    return this.accountTypeRepository.save(accountType);
  }

  async update(
    id: number,
    accountType: Partial<AccountType>,
  ): Promise<AccountType> {
    await this.accountTypeRepository.update(id, accountType);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.accountTypeRepository.delete(id);
  }
}
