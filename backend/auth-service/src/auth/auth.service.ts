import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: CreateAuthDto) {
    const existingUser = await this.prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });

    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });

    return {
      message: 'Register success',
      data: {
        id: admin.id,
        username: admin.username,
      },
    };
  }

  async login(data: LoginAuthDto) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        username: data.username,
      },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(data.password, admin.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: admin.id,
      username: admin.username,
    };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
    };
  }
}
