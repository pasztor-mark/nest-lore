import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {User} from "@prisma/client";
import {TeacherProfileDto} from "./dtos/TeacherProfile.dto";
import {StudentProfileDto} from "./dtos/StudentProfile.dto";

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
    async getSelf(id: number) {
        const u = await this.p.user.findFirst({
            where: {
                id
            },
            include: {
                teacher: {
                    where: {
                        id
                    },
                    include: {
                        subjects: true,
                        assignments: true
                    }
                },
                student: {
                    where: {
                        id
                    },
                    include: {
                        studentAssignments: {
                            where: {
                                studentId: id
                            },
                            include: {
                                assignment: true
                            }
                        }
                    }
                }
            }
        })

        if (!u) throw new UnauthorizedException()
        if (u.role === "TEACHER") {
            const teacher: TeacherProfileDto = {
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                subjects: u.teacher.subjects.map((i) => i.subject),
                assignments: u.teacher.assignments.map((i) => i.name),
            }
            return teacher
        }
        else {
            const student : StudentProfileDto = {
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                gradeLevel: u.student.gradeLevel,
                assignments:u.student.studentAssignments.map((i) => i.assignment.name)
            }
            return student
        }

    }
}
