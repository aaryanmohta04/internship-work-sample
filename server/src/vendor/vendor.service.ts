import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { BaseService } from '../base/base.service';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly baseService: BaseService<Vendor>,
  ) {}

  async findAll(
    offset: number,
    limit: number,
  ): Promise<{ data: Vendor[]; totalRows: number }> {
    const vendors = this.vendorRepository
      .createQueryBuilder('vendor')
      .leftJoinAndSelect('vendor.contacts', 'contact')
      .select([
        'vendor.id',
        'vendor.term',
        'vendor.name',
        'vendor.status',
        'contact',
      ]);

    const [data, totalRows] = await this.baseService.getManyAndCount(
      vendors,
      offset,
      limit,
    );

    return { data, totalRows };
  }

  async findOne(id: number): Promise<Vendor | null> {
    return await this.vendorRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });
  }

  async create(vendor: Vendor): Promise<Vendor> {
    if (vendor.contacts && vendor.contacts.length > 5) {
      throw new BadRequestException(
        'A vendor can have a maximum of 5 contacts.',
      );
    }
    return await this.vendorRepository.save(vendor);
  }

  async update(id: number, vendor: Partial<Vendor>): Promise<void> {
    if (vendor.contacts && vendor.contacts.length > 5) {
      throw new BadRequestException(
        'A vendor can have a maximum of 5 contacts.',
      );
    }
    await this.vendorRepository.update(id, vendor);
  }

  async remove(id: number): Promise<void> {
    await this.vendorRepository.delete(id);
  }
}
