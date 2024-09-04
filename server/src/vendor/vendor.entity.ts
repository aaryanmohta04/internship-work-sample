import { Contact } from 'src/contact/contact.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  methodType!: string;

  @Column()
  term!: string;

  @Column({ nullable: true })
  address1!: string;

  @Column({ nullable: true })
  address2!: string;

  @Column({ nullable: true })
  address3!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  zip!: string;

  @Column({ nullable: true })
  country!: string;

  @Column()
  status!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  credits!: number;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => Contact, (contact) => contact.vendor, { cascade: true })
  contacts!: Contact[];
}
