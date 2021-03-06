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
import { MailModule } from './mail/mail.module';
import {MailerModule} from "@nestjs-modules/mailer";
import * as path from "path"

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
      // MailModule,
      // MailerModule,
  ]
})
export class AppModule {}
