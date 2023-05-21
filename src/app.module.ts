import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import {TypeOrmModule } from "@nestjs/typeorm";
import { Test } from "./models/Test";
import { typeOrmAsyncConfig } from "./database.providers";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true}),
    TypeOrmModule.forRootAsync(
      typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Test]),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService ],
  exports: []
})
export class AppModule {}
