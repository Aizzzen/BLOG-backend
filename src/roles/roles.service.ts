import { Injectable } from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        // делаем записи в базу данных
        const role = await this.roleRepository.create(dto)
        return role
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where: {value}})
        return role
    }

    async getRoles() {
        const roles = await this.roleRepository.findAll({include: {all: true}})
        return roles
    }


}
