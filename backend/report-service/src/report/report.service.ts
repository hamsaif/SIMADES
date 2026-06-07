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

  findAll() {
    return `This action returns all report`;
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
