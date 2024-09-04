import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}

  async findAll(): Promise<City[]> {
    return await this.cityRepository.find({ relations: ['state'] });
  }

  async findOne(id: number): Promise<City | null> {
    return await this.cityRepository.findOne({
      where: { id },
      relations: ['state'],
    });
  }

  async create(city: City): Promise<City> {
    return await this.cityRepository.save(city);
  }

  async update(id: number, city: Partial<City>): Promise<void> {
    await this.cityRepository.update(id, city);
  }

  async remove(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }
}
