import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: PrismaService) {}
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.databaseService.artist.create({ data: createArtistDto });
  }

  async findAllArtists() {
    return await this.databaseService.artist.findMany();
  }

  async findArtist(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id: id },
    });
    if (!artist) {
      throw new NotFoundException('Artist is not found');
    }
    return artist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.databaseService.artist.update({
        where: { id: id },
        data: updateArtistDto,
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

  async removeArtist(id: string) {
    try {
      return this.databaseService.artist.delete({ where: { id: id } });
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
