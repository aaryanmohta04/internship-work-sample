import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelClass } from './model-class.entity';
import { Model } from '../model/model.entity';
import { Class } from '../class/class.entity';

@Injectable()
export class ModelClassService {
  constructor(
    @InjectRepository(ModelClass)
    private modelClassRepository: Repository<ModelClass>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async findAll(): Promise<ModelClass[]> {
    return this.modelClassRepository.find();
  }

  async findOne(id: number): Promise<ModelClass> {
    const modelClass = await this.modelClassRepository.find();
    if (!modelClass) {
      throw new NotFoundException(`ModelClass with ID ${id} not found`);
    }
    return modelClass[0];
  }

  async create(modelId: number, classId: number): Promise<ModelClass> {
    const model = await this.modelClassRepository.find();
    if (!model) {
      throw new NotFoundException(`Model with ID ${classId} not found`);
    }
    return model[0];
    // const classEntity = await this.classRepository.find();
    // if (!classEntity) {
    //   throw new NotFoundException(`Class with ID ${classId} not found`);
    // }

    // const modelClass = this.modelClassRepository.create({
    //   model,
    //   classEntity,
    // });
    // return this.modelClassRepository.save(modelClass);
  }

  async remove(id: number): Promise<void> {
    const modelClass = await this.findOne(id);
    await this.modelClassRepository.remove(modelClass);
  }
}
