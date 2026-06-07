/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(private prisma: PrismaService) { }

  // Membuat laporan baru
  async create(
    createReportDto: CreateReportDto,
  ) {

    // Simpan laporan ke database
    const report =
      await this.prisma.report.create({
        data: {

          namaPelapor:
            createReportDto.namaPelapor,

          noHp:
            createReportDto.noHp,

          deskripsi:
            createReportDto.deskripsi,

          foto:
            createReportDto.foto,

          assetId:
            createReportDto.assetId,

          assetNama:
            createReportDto.assetNama,

          // NLP nanti mengisi field ini
          prediksiKategori: null,
        },
      });

    return {
      message: 'Report created successfully',
      data: report,
    };
  }

  // Mengambil seluruh laporan
  async findAll() {

    // Ambil semua laporan
    const reports =
      await this.prisma.report.findMany({

        // Laporan terbaru di atas
        orderBy: {
          createdAt: 'desc',
        },
      });

    return {
      message: 'Reports retrieved successfully',
      data: reports,
    };
  }
  // Mengambil satu data laporan
  async findOne(id: string) {

    const report =
      await this.prisma.report.findUnique({
        where: {
          id,
        },
      });

    if (!report) {
      throw new NotFoundException(
        'Report not found',
      );
    }

    return {
      message: 'Report retrieved successfully',
      data: report,
    };
  }

  // Mengubah status laporan
  async update(
    id: string,
    updateReportDto: UpdateReportDto,
  ) {

    // Cari laporan berdasarkan id
    const report =
      await this.prisma.report.findUnique({
        where: {
          id,
        },
      });

    // Jika laporan tidak ditemukan
    if (!report) {
      throw new NotFoundException(
        'Report not found',
      );
    }

    // Update status dan catatan admin
    const updatedReport =
      await this.prisma.report.update({
        where: {
          id,
        },

        data: {
          status: updateReportDto.status,
          catatanAdmin:
            updateReportDto.catatanAdmin,
        },
      });

    return {
      message: 'Report updated successfully',
      data: updatedReport,
    };
  }

  // Menghapus laporan
  async remove(id: string) {

    // Cari laporan berdasarkan id
    const report =
      await this.prisma.report.findUnique({
        where: {
          id,
        },
      });

    // Jika laporan tidak ditemukan
    if (!report) {
      throw new NotFoundException(
        'Report not found',
      );
    }

    // Hapus laporan
    await this.prisma.report.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Report deleted successfully',
    };
  }
}
