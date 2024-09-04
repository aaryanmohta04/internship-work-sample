import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UserRole } from 'src/user-role/user-role.entity';
import { BaseService } from '../base/base.service';
import { UserStore } from 'src/user-store/user-store.entity';
import { UserStatus } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private baseService: BaseService<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    @InjectRepository(UserStore)
    private userStoreRepository: Repository<UserStore>,
  ) {}

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['userRoles', 'userStores', 'accountType'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.userRoles) {
      const oldRoles = await this.userRoleRepository.find({
        where: { userId: id },
      });

      const newRoleIds = updateData.userRoles.map((role) => role.roleId);

      for (const oldRole of oldRoles) {
        if (!newRoleIds.includes(oldRole.roleId)) {
          await this.userRoleRepository.delete(oldRole);
        }
      }

      for (const roleData of updateData.userRoles) {
        await this.userRoleRepository.save({
          userId: Number(id),
          roleId: roleData.roleId,
        });
      }
    }

    if (updateData.userStores) {
      const oldStores = await this.userStoreRepository.find({
        where: { userId: id },
      });

      const newStoreIds = updateData.userStores.map((store) => store.storeId);

      for (const oldStore of oldStores) {
        if (!newStoreIds.includes(oldStore.storeId)) {
          await this.userStoreRepository.delete(oldStore);
        }
      }

      for (const storeData of updateData.userStores) {
        await this.userStoreRepository.save({
          userId: Number(id),
          storeId: storeData.storeId,
        });
      }
    }
    return await this.userRepository.save(updateData);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accountType', 'accountType')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('user.userStores', 'userStore')
      .leftJoinAndSelect('userStore.store', 'store')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.username',
        'user.countryCode',
        'user.mobileNumber',
        'user.status',
        'userRole.roleId',
        'role.name',
        'role.id',
        'userStore.storeId',
        'store.name',
        'store.id',
        'accountType.name',
        'accountType.id',
      ])
      .where({ id })
      .getOne();
  }

  async findAll(
    offset: number,
    limit: number,
    search: string | undefined,
    role: number | undefined,
    active: boolean | undefined,
  ): Promise<{ data: User[]; totalRows: number }> {
    const users = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.accountType', 'accountType')
      .leftJoinAndSelect('user.userRoles', 'userRole')
      .leftJoinAndSelect('userRole.role', 'role')
      .leftJoinAndSelect('user.userStores', 'userStore')
      .leftJoinAndSelect('userStore.store', 'store')
      .select([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.username',
        'user.countryCode',
        'user.mobileNumber',
        'user.status',
        'userRole.roleId',
        'role.name',
        'userStore.storeId',
        'store.name',
        'accountType.name',
        'accountType.id',
      ])
      .andWhere('user.status != :statusPurged')
      .setParameter('statusPurged', UserStatus.PURGED);

    if (search && search != '') {
      users.andWhere(
        '(user.firstName LIKE :search OR user.lastName LIKE :search OR user.email LIKE :search OR CONCAT(user.firstName," ",  user.lastName) LIKE :search)',
        {
          search: `%${search}%`,
        },
      );
    }
    if (role) {
      role = Number(role);
      users.andWhere('(userRole.roleId = :role)', { role });
    }
    if (active) {
      active = Boolean(active);
      users.andWhere('(user.status = :status)', {
        status: active ? 'active' : 'inactive',
      });
    }
    const [data, totalRows] = await this.baseService.getManyAndCount(
      users,
      offset,
      limit,
    );
    return { data, totalRows };
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  generateRandomPassword = (length: number = 8): string => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  async create(user: User): Promise<User> {
    const password = this.generateRandomPassword();
    user.password = await bcrypt.hash(password, 10);
    // email password to user
    const newUser = await this.userRepository.save(user);

    for (const roleData of user.userRoles) {
      await this.userRoleRepository.save({
        userId: Number(newUser.id),
        roleId: roleData.roleId,
      });
    }

    for (const storeData of user.userStores) {
      await this.userStoreRepository.save({
        userId: Number(newUser.id),
        storeId: storeData.storeId,
      });
    }

    return newUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (user) {
      user.status = UserStatus.PURGED;
      await this.userRepository.save(user);
    }
  }
}
