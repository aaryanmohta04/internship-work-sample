import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Module } from './module.entity';

@Injectable()
export class ModuleService {
  constructor(
    @InjectRepository(Module)
    private moduleRepository: Repository<Module>,
  ) {}

  findAll(): Promise<Module[]> {
    return this.moduleRepository.find({ relations: ['parent', 'children'] });
  }

  findOne(id: number): Promise<Module | null> {
    return this.moduleRepository.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });
  }

  create(module: Module): Promise<Module> {
    return this.moduleRepository.save(module);
  }

  async update(id: number, module: Partial<Module>): Promise<Module | null> {
    await this.moduleRepository.update(id, module);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moduleRepository.delete(id);
  }
}
