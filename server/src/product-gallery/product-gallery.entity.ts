import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'product_gallery' })
export class ProductGallery {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Product, (product) => product.galleries)
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column({ type: 'varchar', length: 255 })
  imageName!: string;

  @Column({ type: 'varchar', length: 255 })
  imagePath!: string;

  @Column({ type: 'int' })
  width!: number;

  @Column({ type: 'int' })
  height!: number;

  @Column({ type: 'int' })
  size!: number;

  @Column({ type: 'boolean', default: false })
  default!: boolean;

  @Column({ type: 'boolean', default: false })
  forWeb!: boolean;

  @Column({ type: 'int' })
  order!: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'purged'],
    default: 'active',
  })
  status!: string;

  @Column({ type: 'varchar', length: 255 })
  createdBy!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate!: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy!: string;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedDate!: Date;
}
