import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'users@mail.ru', description: 'Эл.почта'})
    @IsString({message: 'Email должен быть строкой'})
    @IsEmail({},{message: 'Некорректный email'})
    readonly email: string;
    @ApiProperty({example: '123456', description: 'Пароль'})
    @IsString({message: 'Должно быть строкой'})
    @Length(6, 12, {message: 'Пароль должен быть не меньше 6 и не больше 12 символов'})
    readonly password: string;
}
