import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { State } from './state.entity';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}

  async findAll(): Promise<State[]> {
    return await this.stateRepository.find({ relations: ['country'] });
  }

  async findOne(id: number): Promise<State | null> {
    return await this.stateRepository.findOne({
      where: { id },
      relations: ['country'],
    });
  }

  async create(state: State): Promise<State> {
    return await this.stateRepository.save(state);
  }

  async update(id: number, state: Partial<State>): Promise<void> {
    await this.stateRepository.update(id, state);
  }

  async remove(id: number): Promise<void> {
    await this.stateRepository.delete(id);
  }
}
