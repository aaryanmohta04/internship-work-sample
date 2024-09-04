import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { LoggerModule } from 'src/log/logger.module';
import { BaseModule } from 'src/base/base.module';
import { UserRole } from 'src/user-role/user-role.entity';
import { UserStore } from 'src/user-store/user-store.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, UserStore]),
    LoggerModule,
    BaseModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Make sure to export UserService
})
export class UserModule {}
