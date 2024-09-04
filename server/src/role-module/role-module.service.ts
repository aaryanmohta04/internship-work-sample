import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleModule } from './role-module.entity';
import { Module } from 'src/module/module.entity';

@Injectable()
export class RoleModuleService {
  constructor(
    @InjectRepository(RoleModule)
    private roleModuleRepository: Repository<RoleModule>,
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>,
  ) {}

  findAll(): Promise<RoleModule[]> {
    return this.roleModuleRepository.find({ relations: ['role', 'module'] });
  }

  findModulesWithRolePermissions(): Promise<any[]> {
    return this.moduleRepository
      .createQueryBuilder('module')
      .select([
        'module.name AS moduleName',
        'module.key AS moduleKey',
        'roleModule.roleId AS roleId',
        'roleModule.moduleId AS moduleId',
        'roleModule.halfPermission AS halfPermission',
      ])
      .leftJoin(RoleModule, 'roleModule', 'module.id = roleModule.moduleId')
      .where('module.isVisible = :isVisible', { isVisible: true })
      .getRawMany();
  }

  findOne(id: number): Promise<RoleModule | null> {
    return this.roleModuleRepository.findOne({
      where: { id },
      relations: ['role', 'module'],
    });
  }

  create(roleModule: RoleModule): Promise<RoleModule> {
    return this.roleModuleRepository.save(roleModule);
  }

  async update(
    id: number,
    roleModule: Partial<RoleModule>,
  ): Promise<RoleModule | null> {
    await this.roleModuleRepository.update(id, roleModule);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roleModuleRepository.delete(id);
  }
}
