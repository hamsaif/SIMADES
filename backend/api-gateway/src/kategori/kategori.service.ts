/* eslint-disable prettier/prettier */
import {
  HttpException,
  Injectable,
} from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class KategoriService {

  // Ambil seluruh kategori
  async findAll() {

    try {

      const response =
        await axios.get(
          'http://localhost:3002/kategori',
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Ambil kategori berdasarkan id
  async findOne(id: string) {

    try {

      const response =
        await axios.get(
          `http://localhost:3002/kategori/${id}`,
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Tambah kategori
  async create(body: any) {

    try {

      const response =
        await axios.post(
          'http://localhost:3002/kategori',
          body,
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Update kategori
  async update(
    id: string,
    body: any,
  ) {

    try {

      const response =
        await axios.patch(
          `http://localhost:3002/kategori/${id}`,
          body,
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Hapus kategori
  async remove(id: string) {

    try {

      const response =
        await axios.delete(
          `http://localhost:3002/kategori/${id}`,
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