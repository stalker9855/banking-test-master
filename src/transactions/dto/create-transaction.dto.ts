import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsString } from "class-validator"

enum Type {
    profitable = "profitable",
    consumable = "consumable"
  }

export class CreateTransactionDto {
    @ApiProperty({example:1000,description:"transaction value that will be added to bank"})
    @IsNumber()
    readonly amount:number
    @ApiProperty({example:"profitable",description:"transaction type (profitable | consumable)"})
    @IsEnum(Type, { message: 'Invalid type' })
    readonly type: "profitable" | "consumable"
    @ApiProperty({example:"Privat",description:"bank name where transaction was added to"})
    @Transform(({value}) =>  value.toLowerCase())
    @IsString()
    readonly bankName: string
    @ApiProperty({example:"[wood,food,entertainment]",description:"array of transaction categories"})
    @Transform(({value}) =>  value.map((str:string) => str.toLowerCase()))
    @IsArray()
    @ArrayMinSize(1)
    @IsString({
        each:true
    })
    readonly categories: string[]
}
