import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleModule } from 'src/role-module/role-module.entity';

@Entity()
export class Module {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  key!: string;

  @ManyToOne(() => Module, (module) => module.children, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent!: Module;

  @OneToMany(() => Module, (module) => module.parent)
  children!: Module[];

  @Column({ nullable: true })
  parentId!: number;

  @Column()
  displayOrder!: number;

  @Column({ default: true })
  isVisible!: boolean;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => RoleModule, (roleModule) => roleModule.module)
  roleModules!: RoleModule[];
}
