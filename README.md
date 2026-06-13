# SIMADES (Sistem Informasi Manajemen Desa)

SIMADES adalah platform digital terintegrasi untuk manajemen data dan layanan administrasi desa. Proyek ini dibangun menggunakan arsitektur **Microservices** untuk skalabilitas dan kemudahan pemeliharaan.

---

##  Arsitektur Proyek

Proyek ini terdiri dari beberapa layanan utama:

### 1. Backend (Microservices - NestJS)
- **API Gateway**: Gerbang utama komunikasi antar service.
- **Auth Service**: Menangani autentikasi dan otorisasi.
- **Asset Service**: Manajemen aset desa.
- **Report Service**: Menangani pelaporan dan pengaduan.

### 2. Frontend & Mobile
- **CMS Admin**: Panel dashboard untuk administrator desa (Next.js).
- **Mobile User**: Aplikasi mobile untuk warga desa (Expo / React Native).

---

##  Prasyarat (Prerequisites)

Sebelum memulai, pastikan perangkat Anda sudah terinstal:
- [Node.js](https://nodejs.org/) (Versi terbaru/LTS)
- [PostgreSQL](https://www.postgresql.org/) (Sebagai database utama)
- [Git](https://git-scm.com/)
- [Expo Go](https://expo.dev/client) (Untuk menjalankan aplikasi mobile di HP)

---

##  Langkah Instalasi & Setup

Ikuti langkah-langkah berikut untuk menjalankan proyek di lokal:

### 1. Clone Repositori
```bash
git clone https://github.com/hamsaif/SIMADES.git
cd SIMADES
```

### 2. Instalasi Dependensi
Anda perlu menginstal dependensi di root dan di setiap service. 

**Root:**
```bash
npm install
```

**Setiap Service (Copy & Paste):**
```bash
# Backend Services
cd backend/api-gateway && npm install && cd ../..
cd backend/auth-service && npm install && cd ../..
cd backend/asset-service && npm install && cd ../..
cd backend/report-service && npm install && cd ../..

# Mobile & CMS
cd cms-admin && npm install && cd ..
cd mobile-user && npm install && cd ..
```

### 3. Konfigurasi Database (.env)
Setiap service backend memerlukan file `.env`. Anda perlu menyesuaikan konfigurasi database PostgreSQL Anda.

Contoh isi `.env` (Sesuaikan di setiap folder `backend/*`):
```env
DATABASE_URL="postgresql://username:password@localhost:5432/nama_db?schema=public"
JWT_SECRET="rahasia_anda"
```

### 4. Prisma Setup (Database)
Setelah konfigurasi `.env` selesai, jalankan migrate untuk membuat tabel di setiap service yang menggunakan Prisma:
```bash
cd backend/auth-service && npx prisma generate && cd ../..
cd backend/report-service && npx prisma generate && cd ../..
# Tambahkan migrate jika diperlukan: npx prisma migrate dev
```

---

## Menjalankan Proyek

Gunakan command berikut di root direktori untuk menjalankan service:

### Menjalankan Semua Service (Development Mode)
```bash
npm run dev
```
*Mencakup: Gateway, Auth, Asset, Report, dan CMS.*

### Menjalankan Secara Terpisah
| Command | Deskripsi |
| :--- | :--- |
| `npm run backend` | Menjalankan seluruh backend microservices |
| `npm run gateway` | Menjalankan API Gateway saja |
| `npm run auth` | Menjalankan service auth saja |
| `npm run asset` | Menjalankan service asset saja |
| `npm run report` | Menjalankan service report saja |
| `npm run cms` | Menjalankan Dashboard Admin (Next.js) |
| `npm run mobile` | Menjalankan Aplikasi Mobile (Expo) |

---

