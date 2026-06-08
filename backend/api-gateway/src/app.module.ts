import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';
import { KategoriModule } from './kategori/kategori.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [AuthModule, AssetModule, KategoriModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
