import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";


export class CreateCategoryDto {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  available: boolean;
}
