import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DBService } from './abstract/db.servise.abstract';
import { InMemoryGenericBD } from './in-memory/in-memory-generic-db';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { InMemoryFavoritesDB } from './in-memory/in-memory-favorites-db';
import { Favorites } from 'src/interfaces/favorites.interface';
import { FavoriteEntity } from 'src/favorites/entities/favorite.entity';
// import { async } from 'rxjs';

type Pathname = keyof Favorites;

type Entities = Artist[] | Album[] | Track[];

@Injectable()
export class DatabaseService implements DBService {
  users = new InMemoryGenericBD<User, UpdateUserDto>([]);
  readonly artists = new InMemoryGenericBD<Artist, UpdateArtistDto>([]);
  readonly tracks = new InMemoryGenericBD<Track, UpdateTrackDto>([]);
  readonly albums = new InMemoryGenericBD<Album, UpdateAlbumDto>([]);
  readonly favorites = new InMemoryFavoritesDB();

  async checkId(id: string, pathname: Pathname) {
    return await this[pathname].findOne(id);
  }
  async create(payload: string, pathname: Pathname) {
    const obj = await this.checkId(payload, pathname);
    if (!obj) {
      throw new UnprocessableEntityException(`${payload} does not exist`);
    }
    const res = await this.favorites.create(payload, pathname);
    return res && `${payload} exis and added to favorites `;
  }

  async findAll() {
    const entryObj = await this.favorites.findAll();
    const keys = Object.keys(entryObj) as unknown as Pathname[];
    const resObject = await keys.reduce(async (acc, cur) => {
      const reduceEntryObj = await acc;
      const entriesId = entryObj[cur];
      const entities = await entriesId.reduce(async (acc, cur) => {
        const items = await acc;
        const entity = await this[cur].findOne(cur);
        return entity ? [...items, entity] : items;
      }, Promise.resolve([] as Entities));
      return { ...reduceEntryObj, [cur]: entities };
    }, Promise.resolve({} as FavoriteEntity[]));
    return resObject;
  }
}
