import { createParamDecorator, ExecutionContext } from '@nestjs/common';



export const GetCustomer = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const customer = request.user;

    return data ? customer?.[data] : customer;
  }
)