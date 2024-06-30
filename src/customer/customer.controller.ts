import { Controller, Post, Body, Get, UseGuards, SetMetadata, Req, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { GetCustomer } from './decorators/get-customer.decorator';
import { Customer } from './entities/customer.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CustomerRoleGuard } from './guards/customer-role/customer-role.guard';
import { RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './strategies/interfaces/valid-roles.interface';
import { CustomerAuth } from './decorators/customer.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Post('login')
  loginCustomer(@Body() loginCustomerDto: LoginCustomerDto) {
    return this.customerService.login(loginCustomerDto);
  }

  @Get('test')
  // @UseGuards(AuthGuard('jwt'), CustomerRoleGuard)
  // @RoleProtected([ ValidRoles.Guest ])
  @CustomerAuth(ValidRoles.Admin)
  testRoles( @GetCustomer() customer: Customer) {

    return {
      customer
    }
  }

}
