import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dtos/login.dto";
import {RegisterDto} from "./dtos/register.dto";
import {Self} from "./current-user.decorator";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("/login")
    async login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }

    @Post("/logout")
    async logout(@Request() req) {
        return this.authService.logout(req);
    }
    @Post("/register")
    async register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData);
    }

    @UseGuards(JwtAuthGuard)
    @Get("/self")
    async self(@Self() user) {
        return this.authService.self(user);
    }
}