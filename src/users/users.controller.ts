import {Body, Controller, Get, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role-guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe) - валидатор
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // мой декоратор, в нем указываю каким ролям будет доступен этот эндпоинт
    @Roles("ADMIN")
    // доступно только авторизованным
    // @UseGuards(JwtAuthGuard)
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

    // Админ выдает роль
    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto)
    }

    // Бан пользоватнлей
    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.userService.ban(dto)
    }

}
