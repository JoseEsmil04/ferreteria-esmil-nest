import { IsArray, IsBoolean, IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateCustomerDto {

  @IsString()
  @MinLength(2)
  name: string;

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

  @IsBoolean()
  isActive: boolean;

  @IsArray()
  @IsString({ each: true })
  roles: string[];
}
