import {forwardRef, Module} from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {MailModule} from "../mail/mail.module";
import {MailService} from "../mail/mail.service";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            secret: process.env.JWT_KEY || 'secret',
            signOptions: {
                expiresIn: '30d'
            }
        }),
        MailModule,
        MailService
    ],
    exports: [
        AuthModule,
        JwtModule,
        AuthService
    ]
})
export class AuthModule {}
