import { Injectable } from '@nestjs/common';

// PassportStrategy = class ini akan digunakan Passport
// untuk membaca dan memvalidasi JWT
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // Ambil token dari:
      // Authorization: Bearer TOKEN
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // HARUS sama dengan secret saat login
      secretOrKey: 'SIMADES_SECRET',
    });
  }
  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: JwtPayload) {
    // payload berasal dari JWT yang sudah berhasil diverifikasi

    // contoh:
    // {
    //   sub: 'uuid-admin',
    //   username: 'admin'
    // }

    return payload;
  }
}
