/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateKategoriDto {

    // Nama kategori
    // Contoh:
    // Infrastruktur
    // Elektronik
    // Perabotan
    @IsString()
    @IsNotEmpty()
    nama: string;
}