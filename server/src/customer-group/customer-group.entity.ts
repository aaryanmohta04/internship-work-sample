import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../user/user.entity'; // Assuming you have a User entity

export enum CustomerGroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PURGED = 'purged',
}

@Entity('customer_group')
export class CustomerGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'enum', enum: CustomerGroupStatus })
  status!: CustomerGroupStatus;

  @ManyToOne(() => User)
  createdBy!: User;

  @UpdateDateColumn()
  createdDate!: Date;

  @ManyToOne(() => User)
  updatedBy!: User;

  @UpdateDateColumn()
  updatedDate!: Date;
}
