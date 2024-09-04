import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async findAll(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  async findOne(id: number): Promise<Country | null> {
    return await this.countryRepository.findOne({ where: { id } });
  }

  async create(country: Country): Promise<Country> {
    return await this.countryRepository.save(country);
  }

  async update(id: number, country: Partial<Country>): Promise<void> {
    await this.countryRepository.update(id, country);
  }

  async remove(id: number): Promise<void> {
    await this.countryRepository.delete(id);
  }
}
