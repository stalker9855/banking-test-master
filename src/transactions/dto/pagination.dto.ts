import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, Min, Max, IsInt } from "class-validator";

export class PaginationDto {
    @ApiProperty({example:1,description:"page of given transactions in pagination (http param, min = 1)"})
    @Transform(({value})=>Number(value))
    @IsInt()
    @IsOptional()
    @Min(1,{message:"page should be more than 0"})
    readonly page: number = 1;
    @ApiProperty({example:10,description:"limit of given transactions in pagination (http param, max = 100)"})
    @Transform(({value})=>Number(value))
    @IsInt()
    @IsOptional()
    @Min(1,{message:"limit should be more than 0"})
    @Max(100,{message:"limit should be less than 101"})
    readonly limit: number = 5;


}
