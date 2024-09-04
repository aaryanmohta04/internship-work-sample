import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitOfMeasure } from './unit-of-measure.entity';

@Injectable()
export class UnitOfMeasureService {
  constructor(
    @InjectRepository(UnitOfMeasure)
    private readonly unitOfMeasureRepository: Repository<UnitOfMeasure>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    searchQuery: string,
    discontinued: boolean,
  ): Promise<{ data: UnitOfMeasure[]; totalRows: number }> {
    const queryBuilder = this.unitOfMeasureRepository
      .createQueryBuilder('unit')
      .orderBy('unit.name', 'ASC')
      .skip(offset)
      .take(limit);

    if (searchQuery) {
      queryBuilder.andWhere('unit.name LIKE :name', {
        name: `%${searchQuery}%`,
      });
    }

    const [data, totalRows] = await queryBuilder.getManyAndCount();
    return { data, totalRows };
  }

  findOne(id: number): Promise<UnitOfMeasure | null> {
    return this.unitOfMeasureRepository.findOne({ where: { id } });
  }

  async findByProductId(id: number) {
    const [data, totalRows] = await this.unitOfMeasureRepository.findAndCount({
      where: { productId: id },
    });
    return { data, totalRows };
  }

  create(unitOfMeasure: UnitOfMeasure): Promise<UnitOfMeasure> {
    return this.unitOfMeasureRepository.save(unitOfMeasure);
  }

  async update(
    id: number,
    unitOfMeasure: Partial<UnitOfMeasure>,
  ): Promise<UnitOfMeasure | null> {
    await this.unitOfMeasureRepository.update(id, unitOfMeasure);
    return this.findOne(id);
  }

  delete(id: number): Promise<void> {
    return this.unitOfMeasureRepository.delete(id).then(() => {});
  }
}
