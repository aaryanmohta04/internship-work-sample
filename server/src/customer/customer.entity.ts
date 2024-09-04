import { CustomerBusinessModel } from 'src/customer-business-model/customer-business-model.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

export enum Status {
  Active = 'Active',
  Inactive = 'Inactive',
  Purge = 'Purge',
}

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: false })
  isDropship!: boolean;

  @Column({ nullable: true })
  defaultWarehouse!: string;

  @Column({ nullable: true })
  legalName!: string;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'parentId' })
  parentId!: Customer;

  @Column({ nullable: true })
  contactFirstName!: string;

  @Column({ nullable: true })
  contactLastName!: string;

  @Column({ nullable: true, unique: true })
  username!: string;

  @Column({ nullable: true })
  customerTitle!: string;

  @Column({ nullable: true })
  email!: string;

  @Column({ nullable: true })
  password!: string;

  @Column({ nullable: true })
  countryCode!: string;

  @Column({ nullable: true })
  mobileNumber!: string;

  @Column({ nullable: true })
  term!: string;

  @Column({ nullable: true })
  doBusinessAs!: string;

  @Column({ nullable: true })
  personalGuarantee!: boolean;

  @Column({ nullable: true })
  personalGuaranteeFile!: string;

  @Column({ nullable: true })
  ctrOnFile!: boolean;

  @Column({ nullable: true })
  ctrFile!: string;

  @Column({ nullable: true })
  einId!: string;

  @Column({ nullable: true })
  badgerId!: string;

  @Column({ nullable: true })
  quickBookId!: string;

  @Column({ nullable: true })
  hubspotId!: string;

  @Column({ nullable: true })
  websiteId!: string;

  @Column({ default: false })
  isApproved!: boolean;

  @Column({ default: false })
  isTestAccount!: boolean;

  @Column({ default: false })
  isVip!: boolean;

  @ManyToOne(() => User, (user) => user.szContacts, {
    nullable: true,
  })
  szContact!: User;

  @Column({ nullable: true })
  instruction!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  credit!: number;

  @Column({ nullable: true })
  customerStep!: string;

  @Column({ type: 'enum', enum: Status, default: Status.Active })
  status!: Status;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  customerPaymentMethod!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(
    () => CustomerBusinessModel,
    (customerBusinessModel) => customerBusinessModel.customer,
  )
  customerBusinessModels!: CustomerBusinessModel[];
}
