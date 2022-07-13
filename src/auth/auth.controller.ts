import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 200})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }

    // guard - их роль - отграничить доступ к некоторым эндпоинтам
    // реализуем функционал, который будет запрещать неавторизованным пользователем доступ к тем или иным эндпоинтам
    // пользователя не сможет получить список польз-й если он неавторизован

    // позже сделаем и с администраторами и юзерами
}
