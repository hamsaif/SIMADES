/* eslint-disable prettier/prettier */
import {
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

import { ReportStatus } from '@prisma/client';

export class UpdateReportDto {

    // Status laporan
    @IsOptional()
    @IsEnum(ReportStatus)
    status?: ReportStatus;

    // Catatan admin
    @IsOptional()
    @IsString()
    catatanAdmin?: string;
}