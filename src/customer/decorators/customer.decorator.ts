import { UseGuards, applyDecorators } from "@nestjs/common";
import { RoleProtected } from "./role-protected/role-protected.decorator";
import { CustomerRoleGuard } from "../guards/customer-role/customer-role.guard";
import { ValidRoles } from "../strategies/interfaces/valid-roles.interface";
import { AuthGuard } from "@nestjs/passport";


export function CustomerAuth(...roles: ValidRoles[]) {
  return applyDecorators(
    UseGuards(AuthGuard('jwt'), CustomerRoleGuard),
    RoleProtected(roles)
  )
}