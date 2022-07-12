import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  imports: [
      SequelizeModule.forRoot({
         dialect: 'postgres',
         host: 'localhost',
         port: 5432,
         username: 'postgres',
         password: '1234',
         database: 'blog',
         models: [],
         autoLoadModels: true
      }),
      UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
