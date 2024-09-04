import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Role } from '../role/role.entity';
import { Module } from '../module/module.entity';

@Entity()
export class RoleModule {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Role, (role) => role.roleModules)
  @JoinColumn({ name: 'roleId' })
  role!: Role;

  @ManyToOne(() => Module, (module) => module.roleModules)
  @JoinColumn({ name: 'moduleId' })
  module!: Module;

  @Column()
  roleId!: number;

  @Column()
  moduleId!: number;

  @Column({ default: false })
  halfPermission!: boolean;

  @Column()
  updatedBy!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
