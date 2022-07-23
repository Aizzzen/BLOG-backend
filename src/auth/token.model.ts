import {Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface TokenCreationAttrs {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class Token extends Model<Token, TokenCreationAttrs> {

    // т.к. один пользователь один токен
    @HasOne(() => User)
    user: User[]

    @ApiProperty({example: '*some token', description: 'Refresh token'})
    @Column({type:DataType.STRING, allowNull: false})
    refreshToken: string;

}
