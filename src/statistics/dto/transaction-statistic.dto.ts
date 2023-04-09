import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Allow, ArrayNotEmpty, IsArray, IsDate, IsOptional } from "class-validator";

export class TransactionAmountStatisticDto {
    @ApiProperty({example:[1,3,4],description:"array of categories ids"})
    @IsArray()
    @ArrayNotEmpty()
    readonly categoryIds:number[]
    @ApiProperty({example:"1970-01-01",description:"period transactions finding from"})
    @IsOptional()
    @Transform(({value})=>new Date(value))
    @IsDate()
    readonly fromPeriod:Date = new Date("1970-01-01")
    @ApiProperty({example:"2024-01-01",description:"period transactions finding to"})
    @IsOptional()
    @Transform(({value})=>new Date(value))
    @IsDate()
    readonly toPeriod:Date = new Date()
}
