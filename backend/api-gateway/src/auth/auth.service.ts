/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
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
  async profile(
    authorization: string,
  ) {
    try {
      const response = await axios.get(
        'http://localhost:3001/auth/profile',
        {
          headers: {
            Authorization: authorization,
          },
        },
      );

      return response.data;
    } catch (error: any) {
      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }
}