import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {User} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private p: PrismaService) {}

    async findOne(id: number): Promise<User> {
        return this.p.user.findFirst({
            where: {
                id
            }
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return this.p.user.findFirst({
            where: {
                email
            }
        })
    }
}
