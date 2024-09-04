// src/product/product.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Brand } from '../brand/brand.entity';
import { Model } from '../model/model.entity';
import { Class } from '../class/class.entity';
import { ProductChannel } from 'src/product-channel/product-channel.entity';
import { ProductGallery } from 'src/product-gallery/product-gallery.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  alias!: string;

  @Column()
  variety!: string;

  @Column({ nullable: true })
  manufacturerItemNumber!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column({ default: false })
  isPromoItem!: boolean;

  @Column({ nullable: true })
  promotionCode!: string;

  @Column({ nullable: true })
  measure!: string;

  @Column({ nullable: true })
  manufacturerFacility!: string;

  @Column({ default: false })
  isLimitedEdition!: boolean;

  @Column({ default: false })
  isDistributed!: boolean;

  @Column({ default: false })
  isConsignment!: boolean;

  @Column({ default: false })
  isExclusive!: boolean;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand!: Brand;

  @ManyToOne(() => Model, (model) => model.products)
  model!: Model;

  @ManyToOne(() => Class, (classEntity) => classEntity.products, {
    nullable: true,
  })
  classEntity!: Class;

  @Column({ nullable: true })
  quickbookVarietyId!: string;

  @Column({ default: false })
  isBOAvailable!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isOnline!: boolean;

  @Column({ default: 'active' })
  status!: string;

  @Column({ nullable: true })
  abbreviation!: string;

  @Column('json', { nullable: true })
  attributes!: Record<string, any>;

  @Column({ nullable: true })
  createdBy!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => ProductChannel, (productChannel) => productChannel.product)
  productChannels!: ProductChannel[];

  @OneToMany(() => ProductGallery, (productGallery) => productGallery.product)
  galleries!: ProductGallery[];
}
