import { DataSource } from 'typeorm';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Test } from "./models/Test";

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
        Test
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