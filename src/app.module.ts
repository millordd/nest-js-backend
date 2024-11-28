import { Module } from "@nestjs/common";
// import { AppController } from "./app.controller";
// import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { getEnvVar } from "./config";
import { User } from "./users/user.model";

import { GoodsModule } from './goods/goods.module';
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./users/users.module";
// console.log(getEnvVar("POSTGRES_HOST"), getEnvVar("POSTGRES_USER"),"db")
@Module({
    // controllers:[AppController],
    // providers:[AppService],

    imports:[
        ConfigModule.forRoot({
            envFilePath: `.${getEnvVar("NODE_ENV")}.env`,
            isGlobal: true
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: getEnvVar("POSTGRES_HOST"),
            port: Number(getEnvVar("POSTGRES_PORT")),
            username: getEnvVar("POSTGRES_USER"),
            password: getEnvVar("POSTGRES_PASSWORD"),
            database: getEnvVar("POSTGRES_DB"),
            models: [User],
            autoLoadModels:true,
            logging: console.log
          }),
        UserModule,
        AuthModule,
        GoodsModule,
    ],

})
export class AppModule {}