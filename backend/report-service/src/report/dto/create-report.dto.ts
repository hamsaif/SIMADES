/* eslint-disable prettier/prettier */
import {
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateReportDto {

    // Nama pelapor
    @IsOptional()
    @IsString()
    namaPelapor?: string;

    // Nomor HP pelapor
    @IsOptional()
    @IsString()
    noHp?: string;

    // Deskripsi kerusakan
    @IsString()
    @IsNotEmpty()
    deskripsi: string;

    // Foto laporan
    @IsOptional()
    @IsString()
    foto?: string;

    // Asset yang dilaporkan
    @IsString()
    @IsNotEmpty()
    assetId: string;

    // Nama asset
    @IsString()
    @IsNotEmpty()
    assetNama: string;
}