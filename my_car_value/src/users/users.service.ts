import {Injectable, NotFoundException} from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        // create entity instance but not save
        const user = this.repo.create({email, password})

        return this.repo.save(user)
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id })
    }

    find(email: string) {
        return this.repo.findBy({
            email
        })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({ id })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`)
        }
        Object.assign(user, attrs)
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id })
        if (!user) {
            throw new NotFoundException(`User ${id} not found`)
        }
        return this.repo.remove(user)
    }
}
