import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ClassAttribute } from '../class-attribute/class-attribute.entity';
import { Brand } from '../brand/brand.entity';
import { BrandClass } from '../brand-class/brand-class.entity';
import { ModelClass } from '../model-class/model-class.entity';
import { Product } from 'src/product/product.entity';

export enum ClassStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PURGED = 'purged',
}

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ type: 'varchar', nullable: true })
  code!: string | null;

  @Column({
    type: 'enum',
    enum: ClassStatus,
    default: ClassStatus.ACTIVE,
  })
  status!: ClassStatus;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isOnline!: boolean;

  @Column({ default: false })
  isCreditCardAllowed!: boolean;

  @Column()
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => ClassAttribute, (classAttribute) => classAttribute.class, {
    cascade: true,
  })
  classAttributes!: ClassAttribute[];

  @ManyToOne(() => Brand, (brand) => brand.classes, { onDelete: 'CASCADE' })
  brand!: Brand;

  @OneToMany(() => BrandClass, (brandClass) => brandClass.classEntity)
  brandClasses!: BrandClass[];

  @OneToMany(() => ModelClass, (modelClass) => modelClass.classEntity)
  modelClasses!: ModelClass[];

  @OneToMany(() => Product, (product) => product.classEntity)
  products!: Product[];

  attributes!: number[];
}
