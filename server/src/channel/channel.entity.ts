import { ProductChannel } from 'src/product-channel/product-channel.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @UpdateDateColumn()
  updatedDate!: Date;

  @OneToMany(() => ProductChannel, (productChannel) => productChannel.channel)
  productChannels!: ProductChannel[];
}
