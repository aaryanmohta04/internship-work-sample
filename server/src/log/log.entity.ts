import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  entity!: string;

  @Column({ type: 'json' })
  oldData!: Record<string, any>;

  @Column({ type: 'json' })
  newData!: Record<string, any>;

  @CreateDateColumn()
  createdAt!: Date;
}
