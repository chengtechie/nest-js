import {Test} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException} from "@nestjs/common";

let service: AuthService
let fakeUsersService: Partial<UsersService>

describe('AuthService', () => {
    beforeEach(async () => {
        fakeUsersService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve(
                {id: 1, email, password} as User
            )
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService, {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ]
        }).compile()

        service = module.get(AuthService)
    })

    it('should create an instance of auth service', async () => {
        expect(service).toBeDefined()
    });

    it('create user with salted password', async () => {
        const user = await service.signUp('cheng@gmail.com', 'abcd')
        expect(user.password).not.toEqual('abcd')
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('throws error when user already signed up', async function () {
        fakeUsersService.find = () => Promise.resolve(
            [{id: 1, email: 'cheng@gmail.com', password: 'abcd'} as User]
        )
        await expect(service.signUp('cheng@gmail.com', 'abcd'))
            .rejects.toThrow(
                BadRequestException,
        );
    });
})

