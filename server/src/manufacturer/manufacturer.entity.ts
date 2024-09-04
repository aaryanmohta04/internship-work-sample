import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Brand } from '../brand/brand.entity';

@Entity()
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: '' })
  alias!: string;

  @Column()
  name!: string;

  @Column({ default: '' })
  quickbookManufacturerId!: string;

  @Column()
  msaRequired!: boolean;

  @Column({ default: false })
  discontinued!: boolean;

  @Column({ default: true })
  active!: boolean;

  @Column({ default: '' })
  abbreviation!: string;

  @Column({ default: '1' })
  updatedBy!: number;

  @OneToMany(() => Brand, (brand) => brand.manufacturer)
  brands!: Brand[];
}
