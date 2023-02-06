import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Session, UseGuards, UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dtos/create-user.dto";
import {UsersService} from "./users.service";
import {UpdateUserDto} from "./dtos/update-user.dto";
import {Serialize} from "../interceptor/serialize.interceptor";
import {UserDto} from "./dtos/user.dto";
import {AuthService} from "./auth.service";
import {CurrentUser} from "./decorators/current-user.decorator";
import {CurrentUserInterceptor} from "./interceptors/current-user.interceptor";
import {AuthGuard} from "../guards/auth.guard";

@Serialize(UserDto)
@Controller('auth')
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) {
    }



    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id
        return user
    }

    @Post('/signout')
    async signOut(@Body() body: CreateUserDto, @Session() session: any) {
        session.userId = null
    }

    @UseGuards(AuthGuard)
    @Get('/whoami')
    async whoAmI(@CurrentUser() user: string) {
        return user
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('Handler is running')
        const user = await this.usersService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException(`User ${id} not found`)
        }
        return user
    }

    @Get()
    findAll(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }
}
