import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AssetModule } from './asset/asset.module';
import { KategoriModule } from './kategori/kategori.module';

@Module({
  imports: [AuthModule, AssetModule, KategoriModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
