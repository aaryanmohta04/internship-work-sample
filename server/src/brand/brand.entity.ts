import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Class } from '../class/class.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity'; // Assuming there is a Manufacturer entity
import { BrandClass } from '../brand-class/brand-class.entity';
import { Model } from '../model/model.entity';
import { PopularBrand } from 'src/popular-brand/popular-brand.entity';
import { Product } from 'src/product/product.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  manufacturerId!: number;

  @Column({ nullable: true })
  alias!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  narrative!: string;

  @Column({ default: false })
  discontinued!: boolean;

  @Column({ nullable: true })
  abbreviation!: string;

  @Column({ nullable: true })
  quickbookBrandId!: string;

  @Column({ nullable: true })
  path!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column()
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => Class, (classEntity) => classEntity.brand)
  classes!: Class[];

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.brands, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'manufacturerId' })
  manufacturer!: Manufacturer;

  @OneToMany(() => BrandClass, (brandClass) => brandClass.brand)
  brandClasses!: BrandClass[];

  @OneToMany(() => Model, (model) => model.brand)
  models!: Model[];

  @OneToMany(() => PopularBrand, (popularBrand) => popularBrand.brand)
  popularBrands!: PopularBrand[];

  @OneToMany(() => Product, (model) => model.brand)
  products!: Product[];
}
