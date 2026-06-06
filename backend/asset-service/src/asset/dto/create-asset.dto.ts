// eslint-disable-next-line prettier/prettier
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { AssetCondition } from '@prisma/client';

export class CreateAssetDto {

  // Nama aset
  // Contoh: Lampu Jalan RT 01
  @IsString()
  @IsNotEmpty()
  nama: string;

  // Deskripsi aset
  @IsOptional()
  @IsString()
  deskripsi?: string;

  // Lokasi aset
  // Contoh: Depan Masjid
  @IsString()
  @IsNotEmpty()
  lokasi: string;

  // URL / nama file foto
  @IsOptional()
  @IsString()
  foto?: string;

  // Kondisi aset
  @IsEnum(AssetCondition)
  kondisi: AssetCondition;

  // Relasi ke kategori
  @IsString()
  @IsNotEmpty()
  kategoriId: string;
}