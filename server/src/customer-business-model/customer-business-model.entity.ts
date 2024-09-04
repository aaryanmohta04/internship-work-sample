// src/customer-business-model/entities/customer-business-model.entity.ts

import { BusinessModel } from 'src/business-model/business-model.entity';
import { Customer } from 'src/customer/customer.entity';
import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class CustomerBusinessModel {
  @PrimaryColumn()
  customerId!: number;

  @PrimaryColumn()
  businessModelId!: number;

  @ManyToOne(() => Customer, (customer) => customer.customerBusinessModels, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'customerId' })
  customer!: Customer;

  @ManyToOne(
    () => BusinessModel,
    (businessModel) => businessModel.customerBusinessModels,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'businessModelId' })
  businessModel!: BusinessModel;
}
