import {AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import {Report} from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    email: string
    @Column()
    @Exclude()
    password: string
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]

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