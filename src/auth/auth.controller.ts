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

    @ApiOperation({summary: 'Выход'})
    @ApiResponse({status: 200})
    @Post('/logout')
    logout() {
        return this.authService.logout()
    }

    @ApiOperation({summary: 'Активация акканута'})
    @ApiResponse({status: 200})
    @Post('/activate/:link')
    activate() {
        return this.authService.activate()
    }

    @ApiOperation({summary: 'Перезапись токена'})
    @ApiResponse({status: 200})
    @Post('/refresh')
    refresh() {
        return this.authService.refresh()
    }

}
