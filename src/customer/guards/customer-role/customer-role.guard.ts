import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { EnvConfig } from 'src/config/envconfig';
import { META_ROLES } from 'src/customer/decorators/role-protected/role-protected.decorator';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class CustomerRoleGuard implements CanActivate {

  constructor(private jwtService: JwtService, private reflector: Reflector){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles: Array<string> = this.reflector.get(META_ROLES, context.getHandler());

    if(!validRoles) return true;
    if(validRoles.length === 0) return true;

    const request = context.switchToHttp().getRequest();
    
    const customer = request.user as Customer;

    if(!customer) throw new NotFoundException('Customer not found!')

    for(const customerRole of customer.roles) {
      if(validRoles.includes(customerRole)) {
        return true;
      }
    }


    throw new UnauthorizedException('Invalid Role!!')


  }
}
