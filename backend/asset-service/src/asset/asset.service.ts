/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}
  // Membuat aset baru
  async create(createAssetDto: CreateAssetDto) {
    // Cek apakah kategori ada
    const kategori = await this.prisma.kategori.findUnique({
      where: {
        id: createAssetDto.kategoriId,
      },
    });

    // Jika kategori tidak ditemukan
    if (!kategori) {
      throw new BadRequestException('Kategori not found');
    }

    // Simpan aset
    const asset = await this.prisma.asset.create({
      data: {
        nama: createAssetDto.nama,

        deskripsi: createAssetDto.deskripsi,

        lokasi: createAssetDto.lokasi,

        foto: createAssetDto.foto,

        kondisi: createAssetDto.kondisi,

        kategoriId: createAssetDto.kategoriId,
      },
    });

    return {
      message: 'Asset created successfully',
      data: asset,
    };
  }

  // Mengambil seluruh data aset
  async findAll() {
    // Ambil semua aset beserta kategori
    const assets = await this.prisma.asset.findMany({
      include: {
        // Join ke tabel kategori
        kategori: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      message: 'Assets retrieved successfully',
      data: assets,
    };
  }

  // Mengambil detail aset berdasarkan id
  async findOne(id: string) {
    // Cari aset beserta kategori
    const asset = await this.prisma.asset.findUnique({
      where: {
        id,
      },

      include: {
        kategori: true,
      },
    });

    // Jika aset tidak ditemukan
    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    return {
      message: 'Asset retrieved successfully',
      data: asset,
    };
  }

  // Mengubah data aset
  async update(id: string, updateAssetDto: UpdateAssetDto) {
    // Cek apakah aset ada
    const asset = await this.prisma.asset.findUnique({
      where: {
        id,
      },
    });

    if (!asset) {
      throw new NotFoundException('Asset not found');
    }

    // Jika kategoriId dikirim,
    // cek apakah kategori tersebut ada
    if (updateAssetDto.kategoriId) {
      const kategori = await this.prisma.kategori.findUnique({
        where: {
          id: updateAssetDto.kategoriId,
        },
      });

      if (!kategori) {
        throw new BadRequestException('Kategori not found');
      }
    }

    // Update data aset
    const updatedAsset = await this.prisma.asset.update({
      where: {
        id,
      },

      data: {
        nama: updateAssetDto.nama,
        deskripsi: updateAssetDto.deskripsi,
        lokasi: updateAssetDto.lokasi,
        foto: updateAssetDto.foto,
        kondisi: updateAssetDto.kondisi,
        kategoriId: updateAssetDto.kategoriId,
      },

      include: {
        kategori: true,
      },
    });

    return {
      message: 'Asset updated successfully',
      data: updatedAsset,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} asset`;
  }
}
