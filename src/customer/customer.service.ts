import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { Model } from 'mongoose';
import { Customer } from './entities/customer.entity';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JWTokenPayload } from './strategies/interfaces/jwt-payload.interface';

@Injectable()
export class CustomerService {

  constructor(
    @InjectModel(Customer.name)
    private readonly customerModel: Model<Customer>,
    private readonly jwtService: JwtService
  ){}

  async create(createCustomerDto: CreateCustomerDto) {
    const { password } = createCustomerDto;

    const customer = await this.customerModel.findOne({ email: createCustomerDto.email })
    
    if(customer) {
      throw new BadRequestException(`Customer with email ${createCustomerDto.email } exist!`)
    }

    const newCustomer = await this.customerModel.create({
      ...createCustomerDto,
      password: bcrypt.hashSync(password, 10)
    });

    await newCustomer.save();

    return {
      ...newCustomer.toJSON(),
      token: this.getJWT({ email: newCustomer.email })
    }
  }

  async login(loginCustomerDto: LoginCustomerDto) {

    const customer = await this.customerModel.findOne({ email: loginCustomerDto.email }, {
      name: true,
      email: true,
      isActive: true,
      roles: true,
      password: true
    });

    if(!customer) {
      throw new UnauthorizedException('Invalid Credentials (Email)!');
    }

    const validatePassword = bcrypt.compareSync(loginCustomerDto.password, customer.password)
    
    if(!validatePassword) {
      throw new UnauthorizedException('Invalid Credentials (Password)!!');
    }

    const { password, ...result} = customer.toJSON()

    return {
      ...result,
      token: this.getJWT({email: result.email})
    };
  }

  private getJWT(jwtokenPayload: JWTokenPayload){
    const token = this.jwtService.sign(jwtokenPayload);

    return token;
  }
}
