import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/user/user.entity';

export enum AccountTypeStatus {
  ACTIVE = 1,
  INACTIVE = 2,
  PURGED = 3,
}

@Entity()
export class AccountType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: AccountTypeStatus,
    default: AccountTypeStatus.ACTIVE,
  })
  status!: AccountTypeStatus;

  @OneToMany(() => User, (user) => user.accountType)
  users!: User[];

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
