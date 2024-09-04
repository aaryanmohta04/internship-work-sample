// src/customer/customer.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private baseService: BaseService<Customer>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    searchQuery: string,
    active: boolean | string | undefined,
  ): Promise<{ data: Customer[]; totalRows: number }> {
    const customers = this.customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.szContact', 'szContact')
      .select([
        'customer.id',
        'customer.status',
        'customer.legalName',
        'customer.contactFirstName',
        'customer.contactLastName',
        'customer.email',
        'customer.credit',
        'customer.username',
        'szContact.firstName',
        'szContact.id',
      ])
      .orderBy('customer.legalName', 'ASC');
    if (searchQuery) {
      customers.andWhere(
        '(customer.username LIKE :search OR customer.legalName LIKE :search OR customer.contactFirstName LIKE :search OR customer.contactLastName LIKE :search OR customer.email LIKE :search OR CONCAT(customer.contactFirstName," ",  customer.contactLastName) LIKE :search)',
        {
          search: `%${searchQuery}%`,
        },
      );
    }
    if (active != undefined || active != '') {
      active = active == 'true' ? true : false;
      customers.andWhere('(customer.status = :status)', {
        status: active ? 'Active' : 'Inactive',
      });
    }
    const [data, totalRows] = await this.baseService.getManyAndCount(
      customers,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  findOne(id: number): Promise<Customer | null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  create(customer: Customer): Promise<Customer> {
    return this.customerRepository.save(customer);
  }

  async update(id: number, customer: Customer): Promise<Customer | null> {
    await this.customerRepository.update(id, customer);
    return this.customerRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
