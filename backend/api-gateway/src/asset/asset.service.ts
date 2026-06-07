/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AssetService {

  // Ambil seluruh asset
  async findAll() {

    const response =
      await axios.get(
        'http://localhost:3002/asset',
      );

    return response.data;
  }
}