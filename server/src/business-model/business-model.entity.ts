// src/business-model/entities/business-model.entity.ts

import { CustomerBusinessModel } from 'src/customer-business-model/customer-business-model.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum PrimaryType {
  B2B = 'B2B',
  B2C = 'B2C',
}

@Entity()
export class BusinessModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: PrimaryType })
  primaryType!: PrimaryType;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(
    () => CustomerBusinessModel,
    (customerBusinessModel) => customerBusinessModel.businessModel,
  )
  customerBusinessModels!: CustomerBusinessModel[];
}
