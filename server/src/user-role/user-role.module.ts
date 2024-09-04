import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  controllers: [UserRoleController],
})
export class UserRoleModule {}
