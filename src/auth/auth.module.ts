import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { async } from "rxjs";
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "../guards/jwt-guard";
import { AuthGuard } from "@nestjs/passport";
import { JwtStrategy } from "../decorators/jwt-strategy";
import { UserModule } from "../user/user.module";

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[
        ConfigModule
      ],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService)=>({
        secret:configService.get('JWT_SECRET'),
        signOptions:{expiresIn: '1000s'}
      })
    }),
    forwardRef(()=>UserModule)
  ],
  providers: [AuthService, JwtAuthGuard, JwtAuthGuard, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
