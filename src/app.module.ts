import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validate } from "class-validator";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EnvModule } from "./env/env.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    EnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
