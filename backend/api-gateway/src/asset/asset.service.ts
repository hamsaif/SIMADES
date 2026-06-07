/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AssetService {

    // Ambil seluruh asset
    async findAll() {

        const response =
            await axios.get(
                'http://localhost:3002/asset',
            );

        return response.data;
    }
    // Ambil asset berdasarkan id
    async findOne(id: string) {
        try {

            const response = await axios.get(
                `http://localhost:3002/asset/${id}`,
            );

            return response.data;

        } catch (error: any) {

            throw new HttpException(
                error.response.data,
                error.response.status,
            );
        }
    }


    // Tambah asset
    async create(body: any) {
        const response = await axios.post(
            'http://localhost:3002/asset',
            body,
        );

        return response.data;
    }

    // Update asset
    async update(
        id: string,
        body: any,
    ) {
        try {

            const response = await axios.patch(
                `http://localhost:3002/asset/${id}`,
                body,
            );

            return response.data;

        } catch (error: any) {

            throw new HttpException(
                error.response.data,
                error.response.status,
            );
        }
    }

    // Hapus asset
    async remove(id: string) {
        try {

            const response = await axios.delete(
                `http://localhost:3002/asset/${id}`,
            );

            return response.data;

        } catch (error: any) {

            throw new HttpException(
                error.response.data,
                error.response.status,
            );
        }
    }
}