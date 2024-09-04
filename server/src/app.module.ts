import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { AuthModule } from './auth/auth.module';
import { AttributeModule } from './attribute/attribute.module';
import { ClassModule } from './class/class.module';
import { ClassAttributeModule } from './class-attribute/class-attribute.module';
import { BrandModule } from './brand/brand.module';
import { BrandClassModule } from './brand-class/brand-class.module';
import { RoleModule } from './role/role.module';
import configuration from './config/configuration';
import { ModelModule } from './model/model.module';
import { ModelClassModule } from './model-class/model-class.module';
import { ChannelModule } from './channel/channel.module';
import { LoggerModule } from './log/logger.module';
import { ModuleModule } from './module/module.module';
import { RoleModuleModule } from './role-module/role-module.module';
import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { ContactModule } from './contact/contact.module';
import { VendorModule } from './vendor/vendor.module';
import { BaseModule } from './base/base.module';
import { PopularBrandModule } from './popular-brand/popular-brand.module';
import { WebsiteBannerModule } from './website-banner/website-banner.module';
import { NewArrivalsModule } from './new-arrival/new-arrival.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserStoreModule } from './user-store/user-store.module';
import { AccountTypeModule } from './account-type/account-type.module';
import { S3Module } from './s3/s3.module';
import { CacheModule } from './cache/cache.module';
import { BusinessModelModule } from './business-model/business-model.module';
import { CustomerBusinessModelModule } from './customer-business-model/customer-business-model.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ProductChannelModule } from './product-channel/product-channel.module';
import { ProductGalleryModule } from './product-gallery/product-gallery.module';
import { ShippingMethodModule } from './shipping-method/shipping-method.module';
import { UnitOfMeasureModule } from './unit-of-measure/unit-of-measure.module';
import { CustomerGroupModule } from './customer-group/customer-group.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'), // Replace with your MySQL username
        password: configService.get<string>('database.password'), // Replace with your MySQL password
        database: configService.get<string>('database.db'), // Replace with your MySQL database name
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AccountTypeModule,
    AuthModule,
    AttributeModule,
    BaseModule,
    BrandModule,
    BrandClassModule,
    BusinessModelModule,
    ChannelModule,
    ContactModule,
    CityModule,
    ClassModule,
    ClassAttributeModule,
    CountryModule,
    CacheModule,
    CustomerModule,
    CustomerBusinessModelModule,
    CustomerGroupModule,
    LoggerModule,
    ManufacturerModule,
    ModelModule,
    ModelClassModule,
    ModuleModule,
    NewArrivalsModule,
    PopularBrandModule,
    ProductModule,
    ProductChannelModule,
    ProductGalleryModule,
    RoleModule,
    RoleModuleModule,
    S3Module,
    ShippingMethodModule,
    StateModule,
    StoreModule,
    UnitOfMeasureModule,
    UserModule,
    UserRoleModule,
    UserStoreModule,
    VendorModule,
    WebsiteBannerModule,
  ],
})
export class AppModule {}
