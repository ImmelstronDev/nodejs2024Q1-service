import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: PrismaService) {}
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.databaseService.album.create({ data: createAlbumDto });
  }

  async findAllAlbums() {
    return await this.databaseService.album.findMany();
  }

  async findAlbum(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new NotFoundException('Album is not found');
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.databaseService.album.update({
        where: { id: id },
        data: updateAlbumDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User was not found`);
      } else {
        throw error;
      }
    }
  }

  async removeAlbum(id: string) {
    try {
      return await this.databaseService.album.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User was not found`);
      } else {
        throw error;
      }
    }
  }
}
