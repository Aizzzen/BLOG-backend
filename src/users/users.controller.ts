import {Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
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
import {UnBanUserDto} from "./dto/unban-user.dto";

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

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // мой декоратор, в нем указываю каким ролям будет доступен этот эндпоинт

    // раскоммм
    // @Roles("ADMIN")

    // доступно только авторизованным
    // @UseGuards(JwtAuthGuard)

    // раскомм
    //@UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

    //удаление
    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: [User]})
    // мой декоратор, в нем указываю каким ролям будет доступен этот эндпоинт
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteByValue(@Param('id') id: number){
        return this.userService.deleteByValue(id)
    }

    @Get('/:value')
    // getByValue(@Param('value') value: string) {
    //     return this.roleService.getRoleByValue(value)
    // }

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
    @ApiOperation({summary: 'Заблокировать пользователя'})
    @ApiResponse({status: 200})
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.userService.ban(dto)
    }

    // unban пользоватнлей
    @ApiOperation({summary: 'Разблокировать пользователя'})
    @ApiResponse({status: 200})
    // @Roles("ADMIN")
    // @UseGuards(RolesGuard)
    @Post('/unban')
    unban(@Body() dto: UnBanUserDto){
        return this.userService.unban(dto)
    }

}
