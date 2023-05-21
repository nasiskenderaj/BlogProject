import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import {TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmAsyncConfig } from "./database.providers";
import { Test } from "./models/Test";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true}),
    TypeOrmModule.forRootAsync(
      typeOrmAsyncConfig),
    TypeOrmModule.forFeature([Test])
  ],
  controllers: [AppController],
  providers: [AppService ],
  exports: []
})
export class AppModule {}
