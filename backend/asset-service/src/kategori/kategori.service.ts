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

  // Mengubah data kategori berdasarkan id
  async update(id: string, updateKategoriDto: UpdateKategoriDto) {
    // Cari kategori berdasarkan id
    const kategori = await this.prisma.kategori.findUnique({
      where: {
        id,
      },
    });

    if (!kategori) {
      throw new NotFoundException('Kategori not found');
    }

    // Cek apakah nama baru sudah digunakan kategori lain
    const existingKategori = await this.prisma.kategori.findFirst({
      where: {
        nama: updateKategoriDto.nama,

        // selain kategori yang sedang diedit
        NOT: {
          id,
        },
      },
    });

    if (existingKategori) {
      throw new BadRequestException('Kategori already exists');
    }

    const updatedKategori = await this.prisma.kategori.update({
      where: {
        id,
      },
      data: {
        nama: updateKategoriDto.nama,
      },
    });

    return {
      message: 'Kategori updated successfully',
      data: updatedKategori,
    };
  }

  // Menghapus kategori berdasarkan id
  async remove(id: string) {
    // Cari kategori terlebih dahulu
    const kategori = await this.prisma.kategori.findUnique({
      where: {
        id,
      },
    });

    // Jika tidak ditemukan
    if (!kategori) {
      throw new NotFoundException('Kategori not found');
    }

    // Hapus kategori
    await this.prisma.kategori.delete({
      where: {
        id,
      },
    });

    return {
      message: 'Kategori deleted successfully',
    };
  }
}
