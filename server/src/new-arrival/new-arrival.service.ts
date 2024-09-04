import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewArrival } from './new-arrival.entity';
import { Model } from 'src/model/model.entity';

@Injectable()
export class NewArrivalsService {
  constructor(
    @InjectRepository(NewArrival)
    private readonly newArrivalsRepository: Repository<NewArrival>,
    @InjectRepository(Model)
    private modelRepository: Repository<Model>,
  ) {}

  async findAll(): Promise<NewArrival[]> {
    return this.newArrivalsRepository.find({
      relations: ['model'],
      order: { order: 'ASC' },
      where: { isDelete: false },
    });
  }

  async findOne(id: number): Promise<NewArrival | null> {
    return this.newArrivalsRepository.findOne({
      where: { id },
      relations: ['model'],
    });
  }

  async update(newArrivals: { model: Model; order: number }[]): Promise<void> {
    for (const { model, order } of newArrivals) {
      await this.newArrivalsRepository.update({ model }, { order });
    }
  }

  async create(id: number): Promise<NewArrival> {
    const model = await this.modelRepository.findOne({
      where: { id },
    });

    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }

    const newArrivals = await this.findAll();
    const newOrder = newArrivals.length + 1;

    const newArrival = this.newArrivalsRepository.create({
      model,
      order: newOrder,
      createdDate: new Date(),
      updatedDate: new Date(),
    });

    await this.newArrivalsRepository.save(newArrival);
    return newArrival;
  }

  async remove(id: number): Promise<void> {
    const arrival = await this.findOne(id);
    if (arrival) {
      arrival.isDelete = true;
      await this.newArrivalsRepository.save(arrival);
    }
  }
}
