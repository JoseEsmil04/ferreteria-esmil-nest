import { IsEmail, IsString, IsStrongPassword, MaxLength } from "class-validator";

export class LoginCustomerDto {

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1
  })
  @IsString()
  @MaxLength(50)
  password: string;

  @IsEmail()
  @IsString()
  email: string;
}
