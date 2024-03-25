import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: PrismaService) {}
  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    return await this.databaseService.track.create({ data: createTrackDto });
  }

  async findAllTracks() {
    return await this.databaseService.track.findMany();
  }

  async findTrack(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id: id },
    });
    if (!track) {
      throw new NotFoundException('Track is not found');
    }
    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.databaseService.track.update({
        where: { id: id },
        data: updateTrackDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else {
        throw error;
      }
    }
  }

  async removeTrack(id: string) {
    try {
      return await this.databaseService.track.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Track was not found`);
      } else {
        throw error;
      }
    }
  }
}
