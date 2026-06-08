/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { KategoriService } from './kategori.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('kategori')
export class KategoriController {

  constructor(
    private readonly kategoriService: KategoriService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  create(@Body() body: any) {
    return this.kategoriService.create(body);
  }

  @Get()
  findAll() {
    return this.kategoriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kategoriService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.kategoriService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string) {
    return this.kategoriService.remove(id);
  }
}