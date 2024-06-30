import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWTokenPayload } from './interfaces/jwt-payload.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from '../entities/customer.entity';
import { Model } from 'mongoose';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    configService: ConfigService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_KEY')
    })
  }

  async validate(payload: JWTokenPayload): Promise<Customer> {
    const { email } = payload;

    const customer = await this.customerModel.findOne({ email });

    if(!customer) throw new UnauthorizedException('Token not valid!!!');

    if(!customer.isActive) {
      throw new UnauthorizedException('Invalid Token, the customer is inactive');
    }

    return customer;
  }
}