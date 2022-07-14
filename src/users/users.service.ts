import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    // чтобы изначально присвоить роль пользователю
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        // роль по умолчанию
        const role = await this.roleService.getRoleByValue("ADMIN")
        // указаать что роль принадлежит пользователю
        // set позволяет перезаписать поля в БД и сразу его обновить
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAllUsers() {
        // все поля с которыми связан пользователь будут подтягиваться
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

    async addRole(dto: AddRoleDto) {
        // получаем id user
        const user = await this.userRepository.findByPk(dto.userId)
        // получаем роль из БД
        const role = await this.roleService.getRoleByValue(dto.value)
        if(user && role) {
            //если роль и пользователь найдены, то добавляем пользоватлею роль
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if(!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }
        user.banned = true
        user.banReason = dto.banReason
        // обновляем значение в БД
        await user.save()
        return user
    }
}
