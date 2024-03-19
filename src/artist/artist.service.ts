import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from './entities/artist.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createArtist(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artistPayload = {
      id: uuid4(),
      ...createArtistDto,
    };

    return await this.databaseService.artists.create(artistPayload);
  }

  async findAllArtists() {
    return await this.databaseService.artists.findAll();
  }

  async findArtist(id: string) {
    const artist = await this.databaseService.artists.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist is not found');
    }
    return artist;
  }

  async updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.databaseService.artists.update(id, updateArtistDto);
  }

  async removeArtist(id: string) {
    return this.databaseService.delete(id, 'artists');
  }
}
