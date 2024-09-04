import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Model } from '../model/model.entity';
import { Class } from '../class/class.entity';

@Entity()
export class ModelClass {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Model, (model) => model.modelClasses, {
    onDelete: 'CASCADE',
  })
  model!: Model;

  @ManyToOne(() => Class, (classEntity) => classEntity.modelClasses, {
    onDelete: 'CASCADE',
  })
  classEntity!: Class;

  @UpdateDateColumn()
  updatedDate!: Date;
}
