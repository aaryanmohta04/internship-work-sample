// entities/PopularBrand.ts
import { Brand } from 'src/brand/brand.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class PopularBrand {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand!: Brand;

  @Column()
  order!: number;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @Column({ default: false })
  isDelete!: boolean;
}
