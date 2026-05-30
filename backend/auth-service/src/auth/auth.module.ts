import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtAccessStrategy } from './strategies/jwt.access.strategy';

import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: 'SIMADES_SECRET',

      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],

  controllers: [AuthController],

  providers: [AuthService, PrismaService, JwtAccessStrategy],
})
export class AuthModule {}
