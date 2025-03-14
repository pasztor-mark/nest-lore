import {Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {Assignment, TeacherSubject, User} from "@prisma/client";
import {JwtService} from '@nestjs/jwt';
import {LoginDto} from "./dtos/login.dto";
import {RegisterDto} from "./dtos/register.dto";
import {PrismaService} from "../prisma.service";
import {Subject} from "rxjs";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly prisma: PrismaService) {

    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null
    }

    async login(loginData: LoginDto) {
        const user = await this.userService.findOneByEmail(loginData.email);
        if (!user) {
            return null;
        }
        const payload = {email: user.email, sub: user.id};
        return {
            token: this.jwtService.sign(payload)
        }
    }

    async register(registerData: RegisterDto) {
        const user = await this.userService.findOneByEmail(registerData.email);
        if (user) {
            return null
        }
        const hashedPassword = await bcrypt.hash(registerData.password);
        if (hashedPassword) {
            const userData = {
                email: registerData.email,
                password: hashedPassword,
                role: registerData.role,
                firstName: registerData.firstName,
                lastName: registerData.lastName,
            }
            if (registerData.role === "TEACHER") {
                await this.prisma.user.create({
                    data: {
                        ...userData,
                        teacher: {
                            create: {
                                assignments: {
                                    create: []
                                },
                                description: "Hello everyone!",
                                subjects: {
                                    create: []
                                }
                            }
                        }

                    }

                })
            }
            else {
                await this.prisma.user.create({
                    data: {
                        ...userData,
                        student: {
                            create: {
                                assignments: {
                                    create: []
                                },
                                studentAssignments: {
                                    create: []
                                },
                                gradeLevel: 8
                            }
                        }
                    }
                })
            }
            const payload = {email: registerData.email, sub: user.id};
        }
    }

}
