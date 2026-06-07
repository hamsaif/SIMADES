/* eslint-disable prettier/prettier */
import {
  Injectable,
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
  findOne(id: string) {
    return `This action returns a #${id} report`;
  }

  update(id: string, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: string) {
    return `This action removes a #${id} report`;
  }
}
