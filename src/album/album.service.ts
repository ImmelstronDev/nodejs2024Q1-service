import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { Album } from './entities/album.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const albumPayload = {
      id: uuid4(),
      ...createAlbumDto,
    };
    return await this.databaseService.albums.create(albumPayload);
  }

  async findAllAlbums() {
    return await this.databaseService.albums.findAll();
  }

  async findAlbum(id: string) {
    const album = await this.databaseService.albums.findOne(id);
    if (!album) {
      throw new NotFoundException('Album is not found');
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.databaseService.albums.update(id, updateAlbumDto);
  }

  async removeAlbum(id: string) {
    return this.databaseService.albums.delete(id);
  }
}
