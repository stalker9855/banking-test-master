import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { Allow } from "class-validator"

export class CreateBankDto {
    @ApiProperty({example:"privat",description:"bank name"})
    @Transform(({value}) =>  value.toLowerCase())
    @Allow()
    name:string
}
