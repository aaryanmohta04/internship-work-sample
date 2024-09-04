import { NewArrival } from 'src/new-arrival/new-arrival.entity';
import { Brand } from '../brand/brand.entity';
import { Class } from '../class/class.entity';
import { ModelClass } from '../model-class/model-class.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from 'src/product/product.entity';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  alias!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Brand, (brand) => brand.models)
  brand!: Brand;

  @Column({ nullable: true })
  narrative!: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'purged'],
    default: 'active',
  })
  status!: string;

  @Column({ nullable: true })
  abbreviation!: string;

  @Column({ nullable: true })
  quickbookModelId!: string;

  @Column({ nullable: true })
  path!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @ManyToMany(() => Class)
  @JoinTable()
  classes!: Class[];

  @OneToMany(() => ModelClass, (modelClass) => modelClass.model)
  modelClasses!: ModelClass[];

  @OneToMany(() => NewArrival, (newArrival) => newArrival.model)
  newArrivals!: NewArrival[];

  @OneToMany(() => Product, (product) => product.brand)
  products!: Product[];
}
