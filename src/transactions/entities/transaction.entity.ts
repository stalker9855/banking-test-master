import { ApiProperty } from "@nestjs/swagger";
import { Bank } from "src/banks/entities/bank.entity";
import { Category } from "src/categories/entities/category.entity";
import { BaseEntity } from "src/utils/BaseEntity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

interface ITransaction{
    amount:number
    type: "profitable" | "consumable"
}

@Entity()
export class Transaction extends BaseEntity implements ITransaction {
  @ApiProperty({example:1000,description:"transaction value that will be added to bank"})
  @Column()
  amount:number
  @Column({
      type: "enum",
      enum: ["profitable", "consumable"],
      default: "profitable",
    })
      type: "profitable" | "consumable";
  
  @ApiProperty({example:"2023-03-10 10:14:40.911733",description:"transaction creation date"})
  @CreateDateColumn()
    createdAt:Date

  @ManyToOne(type=>Bank,bank=>bank.transactions)
    bank:Bank

  @ManyToMany(type=>Category,category=>category.transactions,{onDelete:"CASCADE"})
  @JoinTable(
      {
          name: 'category_transaction',
          joinColumn: {
            name: 'transactionId',
            referencedColumnName: 'id'
           },
          inverseJoinColumn: {
            name: 'categoryId',
            referencedColumnName: 'id'
          }
      }
    )
    categories:Category[]
}
