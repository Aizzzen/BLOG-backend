import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class BanUserDto {
    @ApiProperty({example: '35', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;
    @ApiProperty({example: 'Оскорбления и мат', description: 'Причина блокировки'})
    @IsString({message: 'Должно быть строкой'})
    readonly banReason: string;
}
