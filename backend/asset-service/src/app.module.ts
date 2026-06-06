import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [KategoriModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
