/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {

  async login(data: any) {

    const response =
      await axios.post(
        'http://localhost:3001/auth/login',
        data,
      );

    return response.data;
  }
}