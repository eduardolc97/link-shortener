import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { };

    async register(email: string, password: string) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true
            }
        })
        if (existingUser) {
            throw new ConflictException('User already exists');
        }
        const passwordHash = await bcrypt.hash(password, 8);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: passwordHash
            }
        });
        return user;
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }

    generateToken(user: User) {
        return this.jwtService.sign({
            sub: user.id,
            email: user.email
        });
    }
}
