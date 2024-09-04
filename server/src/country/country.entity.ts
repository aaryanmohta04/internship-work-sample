import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  iso3!: string;

  @Column()
  numericCode!: string;

  @Column()
  iso2!: string;

  @Column()
  phonecode!: string;

  @Column()
  capital!: string;

  @Column()
  currency!: string;

  @Column()
  currencyName!: string;

  @Column()
  currencySymbol!: string;

  @Column()
  tld!: string;

  @Column({ nullable: true })
  native!: string;

  @Column()
  region!: string;

  @Column()
  subregion!: string;

  @Column('simple-json')
  timezones!: {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
  }[];

  @Column('simple-json')
  translations!: { [key: string]: string };

  @Column('decimal', { precision: 10, scale: 8 })
  latitude!: number;

  @Column('decimal', { precision: 11, scale: 8 })
  longitude!: number;

  @Column()
  emoji!: string;

  @Column()
  emojiU!: string;

  @CreateDateColumn()
  createdDate!: Date;

  @UpdateDateColumn()
  updatedDate!: Date;

  @Column()
  flag!: string;

  @Column({ nullable: true })
  wikiDataId!: string;
}
