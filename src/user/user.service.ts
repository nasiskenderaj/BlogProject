import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Test } from "../models/Test";
import { Repository } from "typeorm";
import { UserEntity } from "./models/user.entity";
import { User } from "./models/user.interface";
import { from, Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>) {}
  
 create(user: User): Observable<User>{
    return from(this.usersRepository.save(user))
 }
 
 findOne(id:number):Observable<UserEntity>{
    return from(this.usersRepository.findOne({where: {id:id}}));
 }findAll():Observable<User[]>{
    return from(this.usersRepository.find());
 }
 deleteOne(id:number):Observable<any>{
    return from(this.usersRepository.delete(id));
 }
 updateOne(id:number, user: User):Observable<any> {
 return from(this.usersRepository.update(id, user))
  }
}
