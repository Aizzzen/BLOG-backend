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
import {UnBanUserDto} from "./dto/unban-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Удаление пользователя'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteByValue(@Param('id') id: number){
        return this.userService.deleteByValue(id)
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto){
        return this.userService.addRole(dto)
    }

    @ApiOperation({summary: 'Заблокировать пользователя'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto){
        return this.userService.ban(dto)
    }

    @ApiOperation({summary: 'Разблокировать пользователя'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/unban')
    unban(@Body() dto: UnBanUserDto){
        return this.userService.unban(dto)
    }

}
