import { Store } from 'src/store/store.entity';
import { User } from 'src/user/user.entity';
import { Entity, PrimaryColumn, ManyToOne, Column } from 'typeorm';

@Entity('user_store')
export class UserStore {
  @PrimaryColumn()
  userId!: number;

  @PrimaryColumn()
  storeId!: number;

  @Column({ default: false })
  default!: boolean;

  @ManyToOne(() => User, (user) => user.userStores, { onDelete: 'CASCADE' })
  user!: User;

  @ManyToOne(() => Store, (store) => store.userStores, { onDelete: 'CASCADE' })
  store!: Store;
}
