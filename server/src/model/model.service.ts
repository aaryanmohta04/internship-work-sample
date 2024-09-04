import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './model.entity';
import { BaseService } from '../base/base.service';
import { Class } from 'src/class/class.entity';

@Injectable()
export class ModelService {
  constructor(
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
    private readonly baseService: BaseService<Model>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
  ): Promise<{ data: Partial<Model>[]; totalRows: number }> {
    const models = this.modelRepository
      .createQueryBuilder('model')
      .select(['model.id']);

    const [modelsData, totalRows] = await this.baseService.getManyAndCount(
      models,
      offset,
      limit,
    );

    const modelIds = modelsData.map((model) => model.id);

    const joinedModels = await this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.brand', 'brand')
      .leftJoinAndSelect('model.modelClasses', 'modelClass')
      .leftJoinAndSelect('modelClass.classEntity', 'classEntity')
      .where('model.id IN (:...modelIds)', { modelIds })
      .orderBy('brand.name', 'ASC')
      .getMany();

    const data = joinedModels.map((model) => {
      const { modelClasses, ...rest } = model;
      return {
        ...rest,
        classes: modelClasses.map((mc) => mc.classEntity),
      };
    });

    return { data, totalRows };
  }

  async findForSelection(): Promise<Model[]> {
    const models = this.modelRepository
      .createQueryBuilder('model')
      .select(['model.id', 'model.name'])
      .orderBy('model.name', 'ASC')
      .getMany();
    return models;
  }

  async findOne(id: number): Promise<Model> {
    const model = await this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.brand', 'brand')
      .leftJoinAndSelect('model.modelClasses', 'modelClass')
      .leftJoinAndSelect('modelClass.classEntity', 'classEntity')
      .where('model.id = :id', { id })
      .getOne();

    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async findClassesByModelId(modelId: number): Promise<Class[] | null> {
    const modelWithClasses = await this.modelRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.modelClasses', 'modelClass')
      .leftJoinAndSelect('modelClass.classEntity', 'classEntity')
      .where('model.id = :modelId', { modelId })
      .getOne();

    if (!modelWithClasses) {
      throw new NotFoundException(`Model with ID ${modelId} not found`);
    }
    return modelWithClasses.modelClasses.map((mc) => mc.classEntity);
  }

  async create(data: Partial<Model>): Promise<Model> {
    /*const savedModel = await this.modelRepository.save(data);
    
    const model = this.modelRepository.create({
      ...data,
      brand,
      classes,
    });*/
    return this.modelRepository.save(data);
  }

  async update(id: number, data: Partial<Model>): Promise<Model> {
    //const model = await this.findOne(id);

    /*if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      if (!brand) {
        throw new NotFoundException(`Brand with ID ${data.brandId} not found`);
      }
      model.brand = brand;
    }

    if (data.classes) {
      const classes = await this.classRepository.findByIds(data.classes);
      model.classes = classes;
    }

    Object.assign(model, data);*/
    return this.modelRepository.save(data);
  }

  async remove(id: number): Promise<void> {
    const model = await this.findOne(id);
    await this.modelRepository.remove(model);
  }
}
