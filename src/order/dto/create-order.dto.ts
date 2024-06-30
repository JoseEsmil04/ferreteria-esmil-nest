import { IsArray, IsEnum, IsString, MinLength } from "class-validator"
import { ValidState } from "../interfaces/state.interface"

export class CreateOrderDto {

  
  @IsArray()
  @IsString({ each: true })
  products: string[]

  @IsEnum(ValidState, {
    message: 'State must be a valid enum Value(no-completado en-progreso completado)'
  })
  state: ValidState
}
