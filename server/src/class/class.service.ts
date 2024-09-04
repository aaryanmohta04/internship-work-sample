import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './class.entity';
import { ClassAttribute } from 'src/class-attribute/class-attribute.entity';
import { Attribute } from 'src/attribute/attribute.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class ClassService {
  private readonly logger = new Logger(ClassService.name);

  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
    private readonly baseService: BaseService<Class>,
    @InjectRepository(ClassAttribute)
    private classAttributeRepository: Repository<ClassAttribute>,
    @InjectRepository(Attribute)
    private attributeRepository: Repository<Attribute>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
  ): Promise<{ data: Class[]; totalRows: number }> {
    const classes = this.classRepository
      .createQueryBuilder('class')
      .select('class.id');

    const [classesData, totalRows] = await this.baseService.getManyAndCount(
      classes,
      offset,
      limit,
    );

    const classIds = classesData.map((c) => c.id);

    const data = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.classAttributes', 'classAttribute')
      .leftJoinAndSelect('classAttribute.attribute', 'attribute')
      .where('class.id IN (:...classIds)', { classIds })
      .select([
        'class.id',
        'class.name',
        'classAttribute.id',
        'attribute.id',
        'attribute.displayName',
      ])
      .getMany();

    return { data, totalRows };
  }

  async findClassesForSelection(): Promise<Class[]> {
    return this.classRepository
      .createQueryBuilder('class')
      .select(['class.id', 'class.name'])
      .getMany();
  }

  async findOne(id: number): Promise<any> {
    const queryBuilder = this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.classAttributes', 'classAttribute')
      .leftJoinAndSelect('classAttribute.attribute', 'attribute')
      .where('class.id = :id', { id });
    // .select([
    //   'class.id',
    //   'class.name',
    //   'class.code',
    //   'class.status',
    //   'class.isActive',
    //   'class.isOnline',
    //   'class.isCreditCardAllowed',
    //   'class.updatedBy',
    //   'class.updatedDate',
    //   'classAttribute.id',
    //   'attribute.id',
    //   'attribute.displayName',
    // ])
    const classEntity = await queryBuilder.getOne();

    if (!classEntity) {
      throw new NotFoundException(`Class with ID ${id} not found`);
    }

    const attributes = await this.classRepository
      .createQueryBuilder('class')
      .leftJoinAndSelect('class.classAttributes', 'classAttribute')
      .leftJoinAndSelect('classAttribute.attribute', 'attribute')
      .where('class.id = :id', { id })
      // .select(['attribute.id', 'attribute.displayName'])
      .getRawMany();

    return {
      ...classEntity,
      attributes,
    };
  }

  async create(classData: Partial<Class>): Promise<Class> {
    // Create a new class entity
    const classEntity = this.classRepository.create(classData);
    classEntity.updatedBy = '1';

    const savedClass = await this.classRepository.save(classEntity);

    this.logger.debug(`classData.classAttributes => ${classData.attributes}`);
    // Save class attributes
    if (classData.attributes) {
      for (const attrId of classData.attributes) {
        this.logger.debug(`attrId => ${attrId}`);
        const attribute = await this.attributeRepository.findOne({
          where: { id: attrId },
        });
        if (attribute) {
          const classAttribute = this.classAttributeRepository.create({
            class: savedClass,
            attribute,
          });
          await this.classAttributeRepository.save(classAttribute);
        }
      }
    }

    return savedClass;
  }

  async update(id: number, classEntity: Class): Promise<Class> {
    await this.classRepository.update(id, classEntity);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
