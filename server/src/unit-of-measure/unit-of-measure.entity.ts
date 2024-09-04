import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'unit_of_measure' })
export class UnitOfMeasure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  brandId!: number;

  @Column()
  modelId!: number;

  @Column()
  productId!: number;

  @Column()
  baseUnit!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  baseWeight!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  basePrice!: number;

  @Column('decimal', { precision: 7, scale: 2 })
  listMarkup!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  listPrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  wholesalePrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  netCost!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  averageCost!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  szMargin!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  manufacturerPrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  landedCost!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  fet!: number;

  @Column('int')
  qoh!: number;

  @Column({ nullable: true })
  promotionCode!: string;

  @Column({ nullable: true })
  promotionDescription!: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'purged'],
  })
  status!: string;

  @Column({ nullable: true })
  abbreviation!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  mapPrice!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  srpPrice!: number;

  @Column({
    type: 'enum',
    enum: ['lbs', 'OZ'],
    nullable: true,
  })
  baseWeightType!: string;

  @Column({
    type: 'enum',
    enum: [
      'Bag',
      'Blister',
      'Bottle',
      'Box',
      'Bundle',
      'Can',
      'Case',
      'Each',
      'Humibag',
      'Humidor',
      'Jar',
      'Pack',
      'Pouch',
      'Skid',
      'Sleeve',
      'Stick',
      'Tin',
      // Not Required //
      '*',
      '815970020312',
      'Single',
    ],
  })
  packageType!: string;

  @Column()
  packageCount!: number;

  @Column({
    type: 'enum',
    enum: ['Case', 'Pallet', 'Single', 'Sub-Unit', 'Unit'],
    nullable: true,
  })
  umType!: string;

  @Column({ default: true })
  isOnline!: boolean;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ nullable: true })
  quickbookId!: string;

  @Column({ nullable: true })
  createdBy!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate!: Date;

  @Column({ nullable: true })
  updatedBy!: string;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedDate!: Date;
}
