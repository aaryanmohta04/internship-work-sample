// src/product-channel/product-channel.entity.ts

import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Product } from '../product/product.entity';
import { Channel } from '../channel/channel.entity';

@Entity('product_channel')
export class ProductChannel {
  @PrimaryColumn()
  productId!: number;

  @PrimaryColumn()
  channelId!: number;

  @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @ManyToOne(() => Channel, (channel) => channel.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'channelId' })
  channel!: Channel;
}
