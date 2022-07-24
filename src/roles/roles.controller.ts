import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/role-guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Роли')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {}

    @ApiOperation({summary: 'Создание роли пользователя'})
    @ApiResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @ApiOperation({summary: 'Получение существующих ролей'})
    @ApiResponse({status: 200, type: Role})
    @UseGuards(JwtAuthGuard)
    @Get()
    getRoles() {
        return this.roleService.getRoles()
    }

    @ApiOperation({summary: 'Удаление ролей'})
    @ApiResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteRole(@Param('id') id: number) {
        return this.roleService.deleteRole(id)
    }

}
