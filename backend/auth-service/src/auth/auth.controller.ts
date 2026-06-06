/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt.access.guard';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: CreateAuthDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }
    // Endpoint yang hanya bisa diakses
  // jika membawa JWT yang valid
  @UseGuards(JwtAccessGuard)
  @Get('profile')
  profile(@Req() req: any) {

    // req.user berasal dari
    // JwtAccessStrategy.validate()

    return req.user;
  }
}
