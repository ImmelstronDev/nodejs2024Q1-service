import {
  ForbiddenException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { GenericBD } from '../abstract/genericDB.abstract';
import { DBEntity, DBPayload } from '../abstract/types';
import { UpdateAlbumDto } from 'src/album/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artist/dto/update-artist.dto';
import { UpdateTrackDto } from 'src/track/dto/update-track.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';

export class InMemoryGenericBD<T extends DBEntity, K extends DBPayload>
  implements GenericBD<T, K>
{
  private _database: T[];
  constructor(private database: T[]) {
    this._database = database;
  }

  async create(payload: T): Promise<T> {
    try {
      this._database.push({ ...payload });
      return payload;
    } catch (error) {
      throw new InternalServerErrorException('can not create');
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const objects = [...this._database];
      return objects;
    } catch (error) {
      throw new InternalServerErrorException('can not found');
    }
  }

  async findOne(id: string): Promise<T> {
    try {
      const objects = [...this._database];
      const object = objects.find((item) => item.id === id);
      return object;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new InternalServerErrorException('can not found');
    }
  }

  async update(
    id: string,
    payload: UpdateAlbumDto | UpdateArtistDto | UpdateTrackDto | UpdateUserDto,
  ) {
    try {
      if ('newPassword' in payload) {
        const { newPassword, oldPassword } = payload;
        const users = this._database as unknown as User[];
        const user = users.find((user) => user.id === id);
        if (!user) {
          throw new NotFoundException('user nor found');
        }
        if (user.password === oldPassword) {
          user.password = newPassword;
          user.updatedAt = Date.now();
          user.version += 1;

          return { ...user } as unknown as T;
        }
        throw new ForbiddenException('old password is wrong');
      }
      const objects = this._database;
      const index = objects.findIndex((item) => item.id === id);
      if (index === -1) throw new NotFoundException('user not found');
      objects[index] = { ...objects[index], ...payload };
      return objects[index];
    } catch (error) {
      if (
        error.status === HttpStatus.NOT_FOUND ||
        error.status === HttpStatus.FORBIDDEN
      ) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string) {
    try {
      const objects = this._database;
      const index = objects.findIndex((item) => item.id === id);
      if (index === -1) {
        throw new NotFoundException('not found this id');
      }
      objects.splice(index, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  //   create: (payload: T) => Promise<T>;
  //   findAll: () => Promise<T[]>;
  //   findOne: (id: string) => Promise<T>;
  //   update: (id: string, payload: K) => Promise<T>;
  //   delete: (id: string) => void;
}
