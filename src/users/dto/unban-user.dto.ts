import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class UnBanUserDto {
    @ApiProperty({example: '35', description: 'Уникальный идентификатор пользователя'})
    @IsNumber({}, {message: 'Должно быть числом'})
    readonly userId: number;
}
