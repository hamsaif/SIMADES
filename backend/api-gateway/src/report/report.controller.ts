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

import { ReportService } from './report.service';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('report')
export class ReportController {

    constructor(
        private readonly reportService: ReportService,
    ) { }

    @Post()
    create(@Body() body: any) {
        return this.reportService.create(body);
    }
    @UseGuards(JwtGuard)
    @Get()
    findAll() {
        return this.reportService.findAll();
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reportService.findOne(id);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: any,
    ) {
        return this.reportService.update(id, body);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reportService.remove(id);
    }
}