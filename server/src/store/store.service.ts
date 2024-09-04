import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
    private readonly baseService: BaseService<Store>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    searchQuery: string,
    discontinued: boolean | false,
  ): Promise<{ data: Store[]; totalRows: number }> {
    const queryBuilder = this.storeRepository.createQueryBuilder('store');

    if (searchQuery) {
      queryBuilder.andWhere('store.name LIKE :name', {
        name: `%${searchQuery}%`,
      });
    }

    queryBuilder.andWhere('store.discontinued = :discontinued', {
      discontinued: discontinued,
    });

    const stores = queryBuilder.select([
      'store.code',
      'store.name',
      'store.type',
      'store.id',
    ]);

    const [data, totalRows] = await this.baseService.getManyAndCount(
      stores,
      offset,
      limit,
    );

    return { data, totalRows };
  }

  findOne(id: number): Promise<Store | null> {
    return this.storeRepository.findOneBy({ id });
  }

  async create(store: Store): Promise<Store> {
    return await this.storeRepository.save(store);
  }

  async update(id: number, store: Store): Promise<Store | null> {
    await this.storeRepository.update(id, store);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.storeRepository.delete(id);
  }
}
