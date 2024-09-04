import { UserStore } from 'src/user-store/user-store.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column('simple-array')
  type!: string[];

  @Column()
  address!: string;

  @Column()
  city!: string;

  @Column()
  state!: string;

  @Column()
  country!: string;

  @Column()
  zipcode!: string;

  @Column()
  phone!: string;

  @Column({ default: false })
  discontinued!: boolean;

  @OneToMany(() => UserStore, (userStore) => userStore.store)
  userStores!: UserStore[];
}
