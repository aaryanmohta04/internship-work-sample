import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contact/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [],
  controllers: [],
})
export class ContactModule {}
