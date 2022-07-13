import {ForbiddenException, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(userDto: CreateUserDto) {

    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        try {
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            // создать пользователя
            const user = await this.userService.createUser({...userDto, password: hashPassword})
            // вернет токен
            return this.generateToken(user)
        } catch (error) {
            throw new ForbiddenException('Ошибка при регистрации')
        }

    }

    private async generateToken(user: User) {
        // добавим внутрь токена
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

}
