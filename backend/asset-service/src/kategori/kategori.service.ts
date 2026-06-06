/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateKategoriDto } from './dto/create-kategori.dto';
import { UpdateKategoriDto } from './dto/update-kategori.dto';

@Injectable()
export class KategoriService {
  constructor(private prisma: PrismaService) {}

  async create(createKategoriDto: CreateKategoriDto) {
    // Cek apakah kategori dengan nama yang sama
    // sudah ada di database
    const existingKategori = await this.prisma.kategori.findUnique({
      where: {
        nama: createKategoriDto.nama,
      },
    });

    // Jika ada, hentikan proses
    if (existingKategori) {
      throw new BadRequestException('Kategori already exists');
    }

    // Simpan kategori baru ke database
    const kategori = await this.prisma.kategori.create({
      data: {
        nama: createKategoriDto.nama,
      },
    });

    // Response yang dikirim ke client
    return {
      message: 'Kategori created successfully',
      data: kategori,
    };
  }

  // Mengambil seluruh kategori
  async findAll() {
    // Ambil semua data kategori dari database
    const kategori = await this.prisma.kategori.findMany({
      // Urutkan berdasarkan nama A-Z
      orderBy: {
        nama: 'asc',
      },
    });

    return {
      message: 'Kategori retrieved successfully',
      data: kategori,
    };
  }

  // Mengambil satu kategori berdasarkan id
  async findOne(id: string) {
    // Cari kategori berdasarkan UUID
    const kategori = await this.prisma.kategori.findUnique({
      where: {
        id,
      },
    });

    // Jika kategori tidak ditemukan
    if (!kategori) {
      throw new NotFoundException('Kategori not found');
    }

    return {
      message: 'Kategori retrieved successfully',
      data: kategori,
    };
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
