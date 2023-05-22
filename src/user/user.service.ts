import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity, UserRole } from "./models/user.entity";
import { User } from "./models/user.interface";
import { catchError, from, map, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
              private readonly authService:AuthService) {}
  
 create(user: User): Observable<User>{
    return this.authService.hashPassword(user.password).pipe(
      switchMap((passwordHash:string)=>{
        const newUser = new UserEntity();
        newUser.email = user.email;
        newUser.name = user.name;
        newUser.username = user.username;
        newUser.password = passwordHash;
        newUser.roles = UserRole.USER;
        return from(this.usersRepository.save(newUser)).pipe(map((user:User)=>{
          const {password, ...result} = user;
          return result;
        }),
          catchError(err => throwError(err)))

      })
    )
   // return from(this.usersRepository.save(user))
 }
 
 findOne(id:number):Observable<User>{
    return from(this.usersRepository.findOne({where: {id:id}})).pipe(map((user:User)=>{
      const {password, ...result} = user;
      return result;
    }));
 }
 findAll():Observable<User[]>{
    return from(this.usersRepository.find()).pipe(map((users:UserEntity[])=>{
      users.forEach((user=>{delete user.password;}));
      return users;
    }));
 }
 
 paginate(options:IPaginationOptions): Observable<Pagination<User>>{
    return from(paginate<User>(this.usersRepository, options)).
    pipe(map((userPageable:Pagination<User>)=>{
      userPageable.items.forEach(user=>delete user.password);
      return userPageable
    }))
 }
 deleteOne(id:number):Observable<any>{
    return from(this.usersRepository.delete(id));
 }
 updateOne(id:number, user: User):Observable<any> {
    delete user.email;
    delete user.password;
    delete user.roles;
 return from(this.usersRepository.update(id, user))
  }

  login(user:User):Observable<string>{
   return this.validateUser(user.email, user.password).pipe(switchMap((user:User)=>{
     if (user){
       return this.authService.generateJwt(user).pipe(map((jwt:string)=>jwt));
     } else return "wrong credentials"
   }))
  }
  validateUser(email:string, password:string):Observable<User>{
   return this.findByMail(email).pipe(switchMap((user:User)=>{
     return this.authService.comparePasswords(password, user.password).pipe(map((match:boolean)=>{
       if (match){
         const {password, ...result} = user;
         return result;
       }
       else
         throw Error()
     }))
   }))
  }
  findByMail(email:string):Observable<User>{
    return from(this.usersRepository.findOne({where:{email:email}}))
  }
  findByUserName(username:string):Observable<User>{
    return from(this.usersRepository.findOne({where:{username:username}}))
  }

  updateRoleOfUser(id:number, user:User): Observable<any>{
    return from(this.usersRepository.update(id, user));
  }

}
