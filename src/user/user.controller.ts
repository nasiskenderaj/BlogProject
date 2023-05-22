import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { User } from "./models/user.interface";
import { catchError, map, Observable, of } from "rxjs";
import { UserService } from "./user.service";
import { hasRoles } from "../decorators/roles.decoratos";
import { RolesGuard } from "../guards/roles-guards";
import { JwtAuthGuard } from "../guards/jwt-guard";
import { UserRole } from "./models/user.entity";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }
  @Post()
  create(@Body() user: User): Observable<User|Object>{
    return this.userService.create(user).pipe(map((user:User)=>user),
      catchError(err=>of({error:err.message})));
  }
  @Post('login')
  login(@Body() user:User):Observable<Object>{
    return this.userService.login(user).pipe(map((jwt:string)=>{
      return {acess_token:jwt}
    }));
  }

  @Get(':id')
  findOne(@Param() params): Observable<User>{
    return this.userService.findOne(params.id)
  }
  @Get()
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Query('page') page:number=1, @Query('limit') limit:number=10):Observable<Pagination<User>>{
    limit = limit > 100 ? 100 : limit;
    return this.userService.paginate({page:page, limit:limit, route:"http://localhost:3000/user"});
  }

  @Delete(':id')
  deleteOne(@Param('id') id:string):Observable<any>{
    return this.userService.deleteOne(Number(id));
  }
@Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any>{
    return this.userService.updateOne(Number(id), user);
}
 @Patch(':id')
 @hasRoles(UserRole.ADMIN)
 @UseGuards(JwtAuthGuard, RolesGuard)
  updateRoleOfUser(@Param('id') id:string, @Body()user:User): Observable<User>{
  return this.userService.updateRoleOfUser(Number(id), user);
}
}
