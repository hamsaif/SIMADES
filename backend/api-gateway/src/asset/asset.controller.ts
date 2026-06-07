/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
} from '@nestjs/common';

import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {

  constructor(
    private readonly assetService: AssetService,
  ) {}

  @Get()
  findAll() {
    return this.assetService.findAll();
  }
}