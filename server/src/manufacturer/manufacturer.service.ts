import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Parser } from 'json2csv';
import { BaseService } from '../base/base.service';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
    private readonly baseService: BaseService<Manufacturer>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
    searchQuery: string,
    discontinued: boolean | false,
    status: string,
  ): Promise<{ data: Manufacturer[]; totalRows: number }> {
    const manufacturers = this.manufacturerRepository
      .createQueryBuilder('manufacturer')
      .select([
        'manufacturer.name',
        'manufacturer.msaRequired',
        'manufacturer.id',
      ]);

    if (searchQuery) {
      manufacturers.andWhere('manufacturer.name LIKE :name', {
        name: `%${searchQuery}%`,
      });
    }

    manufacturers.andWhere('manufacturer.discontinued = :discontinued', {
      discontinued: discontinued,
    });

    if (status === 'true') {
      manufacturers.andWhere('manufacturer.active = :active', { active: true });
    } else if (status === 'false') {
      manufacturers.andWhere('manufacturer.active = :active', {
        active: false,
      });
    }

    const [data, totalRows] = await this.baseService.getManyAndCount(
      manufacturers,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  async findManufacturersForSelection(): Promise<Manufacturer[]> {
    return this.manufacturerRepository
      .createQueryBuilder('manufacturer')
      .select(['manufacturer.name', 'manufacturer.id'])
      .getMany();
  }

  findOne(id: number): Promise<Manufacturer | null> {
    return this.manufacturerRepository.findOneBy({ id });
  }

  create(manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerRepository.save(manufacturer);
  }

  // eslint-disable-next-line prettier/prettier
  async update(
    id: number,
    manufacturer: Manufacturer,
  ): Promise<Manufacturer | null> {
    await this.manufacturerRepository.update(id, manufacturer);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.manufacturerRepository.delete(id);
  }

  async exportToCSV(): Promise<string> {
    const manufacturers = await this.manufacturerRepository.find();
    const fields = ['name', 'msaRequired'];
    const parser = new Parser({ fields });
    const csv = parser.parse(manufacturers);
    return csv;
  }
}
