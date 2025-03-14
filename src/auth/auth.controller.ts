import {Body, Controller, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dtos/login.dto";
import {RegisterDto} from "./dtos/register.dto";

@Controller("auth")
export class AuthModule {
    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }

    @UseGuards(LocalAuthGuard)
    @Post("/logout")
    async logout(@Request() req) {
        return req.logout();
    }
    @UseGuards(LocalAuthGuard)
    @Post("/register")
    async register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData);
    }
}