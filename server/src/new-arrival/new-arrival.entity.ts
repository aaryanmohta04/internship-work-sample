import { Model } from 'src/model/model.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('new_arrivals')
export class NewArrival {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Model, (model) => model.newArrivals)
  model!: Model;

  @Column()
  order!: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedDate!: Date;

  @Column({ default: false })
  isDelete!: boolean;
}
