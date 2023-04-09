import { PrimaryGeneratedColumn } from "typeorm";

interface IBaseEntity{
    id:number
}

export abstract class BaseEntity implements IBaseEntity{
    @PrimaryGeneratedColumn()
    id:number
}