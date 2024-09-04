import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
  ) {}

  findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  findByUserId(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({ where: { userId } });
  }

  create(userRole: UserRole): Promise<UserRole> {
    return this.userRoleRepository.save(userRole);
  }

  async remove(userId: number, roleId: number): Promise<void> {
    await this.userRoleRepository.delete({ userId, roleId });
  }
}
