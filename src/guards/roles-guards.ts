import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { map, Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { User } from "../user/models/user.interface";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService,
              ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles){
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request.user.userId.user);
    const user = request.user.userId.user;
    return this.userService.findOne(user.id).pipe(map((user:User)=>{
     const hasRole = ()=> roles.indexOf(user.roles)>-1;
     let hasPermission = false;
     if (hasRole()){
       hasPermission = true
     }
     return user && hasPermission;
    }))
  }
}
