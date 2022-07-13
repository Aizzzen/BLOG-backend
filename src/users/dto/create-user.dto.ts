import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'users@mail.ru', description: 'Эл.почта'})
    readonly email: string;
    @ApiProperty({example: '123456', description: 'Пароль'})
    readonly password: string;
}
