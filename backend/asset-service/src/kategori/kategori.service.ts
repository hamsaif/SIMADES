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

  findAll() {
    return `This action returns all kategori`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kategori`;
  }

  update(id: number, updateKategoriDto: UpdateKategoriDto) {
    return `This action updates a #${id} kategori`;
  }

  remove(id: number) {
    return `This action removes a #${id} kategori`;
  }
}
