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

import { AssetService } from './asset.service';
import { UseGuards } from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('asset')
export class AssetController {

    constructor(
        private readonly assetService: AssetService,
    ) { }

    @Get()
    findAll() {
        return this.assetService.findAll();
    }

    @UseGuards(JwtGuard)
    @Post()
    create(@Body() body: any) {
        return this.assetService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.assetService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.assetService.update(id, body);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assetService.remove(id);
    }
}