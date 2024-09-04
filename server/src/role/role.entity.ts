import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoleModule } from 'src/role-module/role-module.entity';
import { UserRole } from 'src/user-role/user-role.entity';

export enum EntityStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PURGED = 'purged',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: EntityStatus,
    default: EntityStatus.ACTIVE,
  })
  status!: EntityStatus;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => RoleModule, (roleModule) => roleModule.role)
  roleModules!: RoleModule[];

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles!: UserRole[];
}
