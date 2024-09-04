import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { AccountType } from 'src/account-type/account-type.entity';
import { UserRole } from 'src/user-role/user-role.entity';
import { UserStore } from 'src/user-store/user-store.entity';
import { Customer } from 'src/customer/customer.entity';

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PURGED = 'purged',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  emailVerifiedAt!: Date;

  @Column({ nullable: true })
  rememberToken!: string;

  @Column()
  username!: string;

  @Column({ nullable: true })
  countryCode!: string;

  @Column({ nullable: true })
  mobileNumber!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @ManyToOne(() => AccountType, (accountType) => accountType.users, {
    nullable: true,
  })
  accountType!: AccountType;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles!: UserRole[];

  @OneToMany(() => UserStore, (userStore) => userStore.user)
  userStores!: UserStore[];

  @OneToMany(() => Customer, (customer) => customer.szContact)
  szContacts!: Customer[];
}
