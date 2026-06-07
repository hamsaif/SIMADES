-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('MENUNGGU', 'DIVERIFIKASI', 'DIPROSES', 'SELESAI', 'DITOLAK');

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "namaPelapor" TEXT,
    "noHp" TEXT,
    "deskripsi" TEXT NOT NULL,
    "foto" TEXT,
    "assetId" TEXT NOT NULL,
    "assetNama" TEXT NOT NULL,
    "prediksiKategori" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'MENUNGGU',
    "catatanAdmin" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
