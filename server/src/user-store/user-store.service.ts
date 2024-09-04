import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserStore } from './user-store.entity';

@Injectable()
export class UserStoreService {
  constructor(
    @InjectRepository(UserStore)
    private readonly userStoreRepository: Repository<UserStore>,
  ) {}

  findAll(): Promise<UserStore[]> {
    return this.userStoreRepository.find();
  }

  findByUserId(userId: number): Promise<UserStore[]> {
    return this.userStoreRepository.find({ where: { userId } });
  }

  create(userStore: UserStore): Promise<UserStore> {
    return this.userStoreRepository.save(userStore);
  }

  async remove(userId: number, storeId: number): Promise<void> {
    await this.userStoreRepository.delete({ userId, storeId });
  }
}
