import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';
import {Role} from "./roles/roles.model";
import {UserRoles} from "./users-roles/user-roles.model";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
      ConfigModule.forRoot({
         envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      SequelizeModule.forRoot({
         dialect: 'postgres',
         host: process.env.POSTGRES_HOST,
         port: Number(process.env.POSTGRES_PORT),
         username: process.env.POSTGRES_USER,
         password: String(process.env.POSTGRES_PASSWORD),
         database: process.env.POSTGRES_DB,
         models: [User, Role, UserRoles],
         autoLoadModels: true
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
