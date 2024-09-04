import { Vendor } from 'src/vendor/vendor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  email!: string;

  @Column()
  position!: string;

  @Column()
  countryId!: number;

  @Column({ nullable: true })
  mobileNumber!: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.contacts)
  vendor!: Vendor;
}
