import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {LocalStrategy} from "./local.strategy";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./auth.constants";
import {JwtStrategy} from "./jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {PrismaService} from "../prisma.service";
import {AuthController} from "./auth.controller";
import {JwtBlacklistUtil} from "./jwt-blacklist.util";

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService, JwtBlacklistUtil],
  controllers: [AuthController],
  exports: [AuthService],
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: "60s",
    }
  })],
})
export class AuthModule {}
