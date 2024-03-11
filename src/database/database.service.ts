import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';
import { Favorites } from '../interfaces/favorites.interface';
import { IUser } from '../interfaces/user.interface';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { DBService } from './abstract/db.servise.abstract';
import { CreateAlbumDto } from 'src/album/dto/create-album.dto';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { CreateTrackDto } from 'src/track/dto/create-track.dto';
import { GenericBD } from './abstract/genericDB.abstract';
import { InMemoryGenericBD } from './in-memory/in-memory-generic-db';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';

@Injectable()
export class DatabaseService implements DBService {
  users = new InMemoryGenericBD<User, UpdateUserDto>([]);
  readonly artists = new InMemoryGenericBD<Artist, UpdateArtistDto>([]);
  readonly tracks = new InMemoryGenericBD<Track, UpdateTrackDto>([]);
  readonly albums = new InMemoryGenericBD<Album, UpdateAlbumDto>([]);
  // users: GenericBD<User, UpdateUserDto>;
  // artists: GenericBD<Artist, CreateArtistDto>;
  // tracks: GenericBD<Track, CreateTrackDto>;
  // albums: GenericBD<Album, CreateAlbumDto>;
  // public readonly users: User[] = [];
  // public readonly tracks: Track[] = [];
  // public readonly artists: Artist[] = [];
  // public readonly albums: Album[] = [];
  // public readonly favorites: Favorites = {
  //   tracks: [],
  //   artists: [],
  //   albums: [],
  // };
  // async addUser(user: User): Promise<IUser> {
  //   try {
  //     this.users.push({ ...user });
  //     delete user.password;
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
  // async findAllUsers() {
  //   try {
  //     const users = [...this.users];
  //     const resUsers = users.map((user) => {
  //       delete user.password;
  //       return user;
  //     });
  //     return resUsers;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
  // async findOneUser(id: string) {
  //   try {
  //     const users = [...this.users];
  //     const user = users.find((user) => user.id === id);
  //     if (!user) {
  //       throw new NotFoundException(`user with id= ${id} is not found`);
  //     }
  //     return user;
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
  // async updateUser(id: string, payload: UpdateUserDto) {
  //   const { newPassword, oldPassword } = payload;
  //   try {
  //     const users = [...this.users];
  //     const user = users.find((user) => user.id === id);
  //     if (!user) {
  //       throw new NotFoundException(`user with id= ${id} is not found`);
  //     }
  //     if (user.password === oldPassword) {
  //       user.password = newPassword;
  //       user.updatedAt = Date.now();
  //       user.version += 1;
  //       return { ...user };
  //     }
  //     throw new ForbiddenException('incorrect old password');
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
  // async removeUser(id: string) {
  //   try {
  //     const users = this.users;
  //     const index = users.findIndex((user) => user.id === id);
  //     if (index === -1) {
  //       throw new NotFoundException('user not found');
  //     }
  //     users.splice(index, 1);
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
