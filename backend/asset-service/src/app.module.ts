import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KategoriModule } from './kategori/kategori.module';
import { PrismaService } from './prisma.service';
import { AssetModule } from './asset/asset.module';

@Module({
  imports: [KategoriModule, AssetModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
