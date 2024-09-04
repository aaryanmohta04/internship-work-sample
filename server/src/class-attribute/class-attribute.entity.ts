import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Class } from '../class/class.entity';
import { Attribute } from '../attribute/attribute.entity';

@Entity()
export class ClassAttribute {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.classAttributes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'classId' })
  class!: Class;

  @ManyToOne(() => Attribute, (attribute) => attribute.classAttributes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'attributeId' })
  attribute!: Attribute;

  @UpdateDateColumn()
  updatedDate!: Date;
}
