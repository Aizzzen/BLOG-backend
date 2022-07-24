import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./users/users-roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.model";
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from "@nestjs/serve-static"
import { TokenController } from './token/token.controller';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import * as path from "path"
import {MailerModule} from "@nestjs-modules/mailer";

@Module({
  imports: [
      ConfigModule.forRoot({
         envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      SequelizeModule.forRoot({
         dialect: 'postgres',
         host: process.env.POSTGRES_HOST,
         port: Number(process.env.POSTGRES_PORT),
         username: process.env.POSTGRES_USER,
         password: String(process.env.POSTGRES_PASSWORD),
         database: process.env.POSTGRES_DB,
         models: [User, Role, UserRoles, Post],
         autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      JwtModule,
      PostsModule,
      FilesModule,
      TokenModule,
      MailModule,
      MailerModule,
      // Post
  ],
  // controllers: [TokenController, MailController],
  // providers: [TokenService, MailService],
  // controllers: [AuthController, PostsController, CommentsController],
  // providers: [AuthService, PostsService, CommentsService],
})
export class AppModule {}
