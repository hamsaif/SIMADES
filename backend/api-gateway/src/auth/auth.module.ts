import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: 'SIMADES_SECRET',
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
