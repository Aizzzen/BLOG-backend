import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {User} from "../users/users.model";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {
    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создание роли пользователя'})
    @ApiResponse({status: 200, type: Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    // @ApiOperation({summary: 'Получение пользователя по роли'})
    // @ApiResponse({status: 200, type: Role})
    // @Get('/:value')
    // getByValue(@Param('value') value: string) {
    //     return this.roleService.getRoleByValue(value)
    // }

    @ApiOperation({summary: 'Получение существующих ролей'})
    @ApiResponse({status: 200, type: Role})
    @Get()
    getRoles() {
        return this.roleService.getRoles()
    }

    @ApiOperation({summary: 'Удаление ролей'})
    @ApiResponse({status: 200, type: Role})
    @Delete('/:id')
    deleteRole(@Param('id') id: number) {
        return this.roleService.deleteRole(id)
    }
}
