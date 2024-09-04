import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ClassAttribute } from '../class-attribute/class-attribute.entity';

export enum AttributeStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  order!: number;

  @Column({
    type: 'enum',
    enum: AttributeStatus,
    default: AttributeStatus.ACTIVE,
  })
  status!: AttributeStatus;

  @Column()
  type!: string;

  @Column()
  displayName!: string;

  @Column()
  fieldName!: string;

  @Column('simple-array', { nullable: true })
  values!: string[];

  @Column({ default: false })
  isRequired!: boolean;

  @Column({ default: false })
  isInteger!: boolean;

  @Column({ default: false })
  isMultiselect!: boolean;

  @Column()
  updatedBy!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(
    () => ClassAttribute,
    (classAttribute) => classAttribute.attribute,
    { cascade: true },
  )
  classAttributes!: ClassAttribute[];
}
