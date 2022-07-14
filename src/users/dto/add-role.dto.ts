import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class AddRoleDto {
    @ApiProperty({example: 'USER', description: 'Роль пользователя'})
    @IsString({message: 'Должно быть строкой'})
    readonly value: string;
    @ApiProperty({example: '35', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;
}
