/* eslint-disable prettier/prettier */
import {
  HttpException,
  Injectable,
} from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class ReportService {

  // Ambil seluruh laporan
  async findAll() {

    try {

      const response =
        await axios.get(
          'http://localhost:3003/report',
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Ambil laporan berdasarkan id
  async findOne(id: string) {

    try {

      const response =
        await axios.get(
          `http://localhost:3003/report/${id}`,
        );

      return response.data;

    } catch (error: any) {

      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
  }

  // Buat laporan baru
  async create(body: any) {

    try {

      const response =
        await axios.post(
          'http://localhost:3003/report',
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

  // Update status laporan
  async update(
    id: string,
    body: any,
  ) {

    try {

      const response =
        await axios.patch(
          `http://localhost:3003/report/${id}`,
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

  // Hapus laporan
  async remove(id: string) {

    try {

      const response =
        await axios.delete(
          `http://localhost:3003/report/${id}`,
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