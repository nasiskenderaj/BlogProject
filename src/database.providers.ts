import { DataSource } from 'typeorm';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Test } from "./models/Test";
import { UserEntity } from './user/models/user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "nasi7991",
      database: "blogproject",
      entities: [
        Test,
        UserEntity
      ]
      ,
      migrations: ['./database/migrations'],
      migrationsTableName: "migrations",
      extra: {
      },
      synchronize: true,
      logging: true,
    }
  }
}