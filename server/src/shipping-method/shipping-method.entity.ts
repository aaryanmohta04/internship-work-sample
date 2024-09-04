import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shipping_method')
export class ShippingMethod {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate!: Date;
}
