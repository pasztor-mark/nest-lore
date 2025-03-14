import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalStrategy} from "./local.strategy";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth.constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  imports: [AuthService, UserModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: "60s",
    }
  })],
})
export class AuthModule {}
