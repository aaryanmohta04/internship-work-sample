import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Class } from '../class/class.entity';

@Entity()
export class BrandClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Brand, (brand) => brand.brandClasses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brandId' })
  brand!: Brand;

  @ManyToOne(() => Class, (classEntity) => classEntity.brandClasses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classId' })
  classEntity!: Class;

  @Column()
  updatedDate!: Date;
}
