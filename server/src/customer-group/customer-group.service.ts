import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerGroup } from './customer-group.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class CustomerGroupService {
  constructor(
    @InjectRepository(CustomerGroup)
    private readonly customerGroupRepository: Repository<CustomerGroup>,
    private baseService: BaseService<CustomerGroup>,
  ) {}

  async create(
    customerGroupData: CustomerGroup,
    userId: number,
  ): Promise<CustomerGroup> {
    const customerGroup = this.customerGroupRepository.create({
      ...customerGroupData,
      updatedBy: { id: userId }, // Assuming userId is passed from the controller
    });
    return await this.customerGroupRepository.save(customerGroup);
  }

  async findAll(
    offset: number,
    limit: number,
    search: string,
    discontinued: string,
  ): Promise<{ data: CustomerGroup[]; totalRows: number }> {
    const customerGroups = this.customerGroupRepository
      .createQueryBuilder('customer_group')
      .select([
        'customer_group.id',
        'customer_group.name',
        'customer_group.status',
      ])
      .orderBy('customer_group.name', 'ASC');

    if (search && search != '') {
      customerGroups.andWhere('(customer_group.name LIKE :search)', {
        search: `%${search}%`,
      });
    }
    if (discontinued && discontinued != '') {
      customerGroups.andWhere('(customer_group.status = :status)', {
        status: discontinued == 'false' ? 'active' : 'inactive',
      });
    }
    const [data, totalRows] = await this.baseService.getManyAndCount(
      customerGroups,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  async findOne(id: number): Promise<CustomerGroup> {
    const customerGroup = await this.customerGroupRepository.findOne({
      where: { id },
    });
    if (!customerGroup) {
      throw new NotFoundException(`CustomerGroup with ID ${id} not found`);
    }
    return customerGroup;
  }

  async update(
    id: number,
    customerGroupData: CustomerGroup,
    userId: number,
  ): Promise<CustomerGroup> {
    const customerGroup = await this.findOne(id);
    Object.assign(customerGroup, customerGroupData, {
      updatedBy: { id: userId },
    });
    return await this.customerGroupRepository.save(customerGroup);
  }

  async remove(id: number): Promise<void> {
    const customerGroup = await this.findOne(id);
    await this.customerGroupRepository.remove(customerGroup);
  }
}
