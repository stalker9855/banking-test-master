import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Allow } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty({example:"wood",description:"category name"})
    @Transform(({value}) =>  value.toLowerCase())
    @Allow()
    name:string
}
