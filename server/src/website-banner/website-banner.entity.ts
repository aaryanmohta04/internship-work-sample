import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WebsiteBanner {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column({ length: 255 })
  imageName!: string;

  @Column({ length: 255 })
  imagePath!: string;

  @Column('int')
  width!: number;

  @Column('int')
  height!: number;

  @Column('int')
  size!: number;

  @Column({ length: 255 })
  url!: string;

  @Column('int')
  order!: number;

  @Column({ default: false })
  isDelete!: boolean;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;
}
