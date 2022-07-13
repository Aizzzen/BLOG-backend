import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import { RolesModule } from './roles/roles.module';

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
         models: [User],
         autoLoadModels: true
      }),
      UsersModule,
      RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
