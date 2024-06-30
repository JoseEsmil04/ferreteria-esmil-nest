import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './entities/customer.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, JwtStrategy],
  imports: [ 
    ConfigModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema }
    ]), 
    PassportModule.register({
      defaultStrategy: 'jwt' 
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => {
        return {
          secret: ConfigService.get<string>('JWT_KEY'),
          signOptions: {
            expiresIn: '2h'
          }
        }
      }
    })
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '2h'
    //   }
    // })
  ],
  exports: [MongooseModule, PassportModule, JwtModule, JwtStrategy]
})
export class CustomerModule {}
