import {ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";
import * as uuid from "uuid";
import {MailService} from "../mail/mail.service";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService,
                private mailService: MailService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
        }
        try {
            const hashPassword = await bcrypt.hash(userDto.password, 5);
            const activationLink = uuid.v4();
            const user = await this.userService.createUser({...userDto, password: hashPassword, activationLink: activationLink})
            await this.mailService.sendActivationMail(userDto.email, `${process.env.API_URL}/auth/activate/${activationLink}`)
            return this.generateToken(user)
        } catch (error) {
            throw new ForbiddenException('Ошибка при регистрации')
        }

    }

    private async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }

    async logout() {

    }

    async activate() {

    }

    async refresh() {

    }

}
