import {BadRequestException, Injectable, NotFoundException} from "@nestjs/common";
import {UsersService} from "./users.service";
import {randomBytes, scrypt as _scrypt} from "crypto";
import {promisify} from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signUp(email: string, password: string) {
        // check if email exists
        const users = await this.usersService.find(email)
        if (users.length) {
            throw new BadRequestException('Email in use')
        }
        /**
         * 1. Generate salt
         * 2. Hash the salt and password together
         * 3. Join the hash with the salt
         **/
        const salt = randomBytes(8).toString('hex')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        const result = salt + '.' + hash.toString('hex')
        // create new user
        return await this.usersService.create(email, result)
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email)
        if (!user) {
            throw new NotFoundException(`User ${email} not found`)
        }
        const [salt, storedHash] = user.password.split('.')
        const hash = (await scrypt(password, salt, 32)) as Buffer
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Bad password')
        }
        return user
    }
}