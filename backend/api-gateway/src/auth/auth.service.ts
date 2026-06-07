/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AuthService {

  // Forward request login ke auth-service
  async login(body: any) {

    const response =
      await axios.post(
        'http://localhost:3001/auth/login',
        body,
      );

    return response.data;
  }

  // Forward request register ke auth-service
  async register(body: any) {

    const response =
      await axios.post(
        'http://localhost:3001/auth/register',
        body,
      );

    return response.data;
  }
}