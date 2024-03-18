import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { Track } from './entities/track.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createTrack(createTrackDto: CreateTrackDto): Promise<Track> {
    const trackPayload = {
      id: uuid4(),
      ...createTrackDto,
    };
    return await this.databaseService.tracks.create(trackPayload);
  }

  async findAllTracks() {
    return await this.databaseService.tracks.findAll();
  }

  async findTrack(id: string) {
    const track = await this.databaseService.tracks.findOne(id);
    if (!track) {
      throw new NotFoundException('Track is not found');
    }
    return track;
  }

  async updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.databaseService.tracks.update(id, updateTrackDto);
  }

  async removeTrack(id: string) {
    return this.databaseService.tracks.delete(id);
  }
}
