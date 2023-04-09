import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Allow } from 'class-validator';
import { CreateBankDto } from './create-bank.dto';

export class UpdateBankDto extends PartialType(CreateBankDto) {
    @ApiProperty({example:"privat",description:"bank bame"})
    @Transform(({value}) =>  value.toLowerCase())
    @Allow()
    name:string
}
