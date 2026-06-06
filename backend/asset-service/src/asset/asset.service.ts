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

  findAll() {
    return `This action returns all asset`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asset`;
  }

  update(id: number, updateAssetDto: UpdateAssetDto) {
    return `This action updates a #${id} asset`;
  }

  remove(id: number) {
    return `This action removes a #${id} asset`;
  }
}
