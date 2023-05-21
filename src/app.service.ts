import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Test } from "./models/Test";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  constructor(@InjectRepository(Test) private readonly usersRepository: Repository<Test>) {}
}
