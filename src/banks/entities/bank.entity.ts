import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { BaseEntity } from "src/utils/BaseEntity";
import { Entity, Column, OneToMany } from "typeorm"

interface IBank{
    balance:number
    name:string
}

@Entity()
export class Bank extends BaseEntity implements IBank {
    
    @ApiProperty({example:0,description:"bank balance that based on transactions amounts"})
    @Column(
        {
            default: 0
        }
    )
    balance:number

    @ApiProperty({example:"privat",description:"bank bame"})
    @Column(
        {
            unique:true
        }
    )
    name:string

    @OneToMany(type=>Transaction,transaction=>transaction.bank)
    transactions:Transaction[]
}