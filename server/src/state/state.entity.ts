import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from '../country/country.entity';

@Entity()
export class State {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Country, (country) => country.id)
  country!: Country;

  @Column({ nullable: true })
  fipsCode!: string;

  @Column()
  iso2!: string;

  @Column({ nullable: true })
  type!: string;

  @Column('decimal', { precision: 10, scale: 8, nullable: true })
  latitude!: number;

  @Column('decimal', { precision: 11, scale: 8, nullable: true })
  longitude!: number;

  @Column()
  flag!: string;

  @Column({ nullable: true })
  wikiDataId!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
