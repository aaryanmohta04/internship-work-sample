import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityStatus, Role } from './role.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly baseService: BaseService<Role>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    search: string | undefined,
    active: string | undefined,
  ): Promise<{ data: Role[]; totalRows: number }> {
    const roles = this.roleRepository
      .createQueryBuilder('role')
      .select(['role.id', 'role.name', 'role.status'])
      .andWhere('role.status != :statusPurged')
      .setParameter('statusPurged', EntityStatus.PURGED);

    if (search && search != '') {
      roles.andWhere('(role.name LIKE :search)', {
        search: `%${search}%`,
      });
    }

    const status = active == 'true' ? true : false;

    if (active != 'undefined' && active) {
      roles.andWhere('(role.status = :status)', {
        status: status ? EntityStatus.ACTIVE : EntityStatus.INACTIVE,
      });
    }

    const [data, totalRows] = await this.baseService.getManyAndCount(
      roles,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  async findOne(id: number): Promise<Role> {
    const entity = await this.roleRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return entity;
  }

  async findRolesForSelection(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async create(role: Role): Promise<Role> {
    const entity = role;
    if (role.status) {
      entity.status = EntityStatus.ACTIVE;
    } else {
      entity.status = EntityStatus.INACTIVE;
    }
    return this.roleRepository.save(entity);
  }

  async update(id: number, newRole: Role): Promise<Role> {
    const role = await this.findOne(id);
    if (newRole.status) {
      role.status = EntityStatus.ACTIVE;
    } else {
      role.status = EntityStatus.INACTIVE;
    }
    role.name = newRole.name;
    return this.roleRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    entity.status = EntityStatus.PURGED;
    await this.roleRepository.save(entity);
  }
}
