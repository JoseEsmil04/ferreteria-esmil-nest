import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator"

export class CreateProductDto {

  @IsString()
  @MinLength(3)
  name: string
 
  @IsString()
  @MinLength(5)
  description: string
  
  @IsNumber()
  @Min(0)
  @IsPositive()
  price: number

  @IsNumber()
  @Min(0)
  @IsPositive()
  stock: number

  @IsString()
  @MinLength(2)
  category: string
}
