/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit {
    async onModuleInit() {

        // Connect ke database saat aplikasi start
        await this.$connect();
    }
}