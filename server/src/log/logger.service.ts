import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async logChange(
    entity: string,
    oldData: Record<string, any>,
    newData: Record<string, any>,
  ): Promise<void> {
    const log = this.logRepository.create({ entity, oldData, newData });
    await this.logRepository.save(log);
  }
}
