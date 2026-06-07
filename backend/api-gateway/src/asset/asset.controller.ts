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
    ) { }

    @Get()
    findAll() {
        return this.assetService.findAll();
    }

    @Post()
    create(@Body() body: any) {
        return this.assetService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.assetService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.assetService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.assetService.remove(id);
    }
}