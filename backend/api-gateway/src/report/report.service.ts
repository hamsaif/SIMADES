/* eslint-disable prettier/prettier */
import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class ReportService {

  // Helper untuk handle error axios secara konsisten
  private handleError(error: any): never {
    if (error.response) {
      // Error dari report-service (4xx, 5xx)
      throw new HttpException(
        error.response.data,
        error.response.status,
      );
    }
    // Network error / report-service tidak berjalan
    throw new HttpException(
      { message: 'Report service tidak dapat dijangkau' },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }

  // Ambil seluruh laporan
  async findAll() {

    try {

      const response =
        await axios.get(
          'http://localhost:3003/report',
        );

      return response.data;

    } catch (error: any) {
      this.handleError(error);
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
      this.handleError(error);
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
      this.handleError(error);
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
      this.handleError(error);
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
      this.handleError(error);
    }
  }
}