import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    @Exclude()
    password: string

    @AfterInsert()
    logInsert() {
        console.log(`User Id ${this.id} inserted`)
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`User Id ${this.id} updated`)
    }
    @AfterRemove()
    logRemove() {
        console.log(`User Id ${this.id} removed`)
    }
}