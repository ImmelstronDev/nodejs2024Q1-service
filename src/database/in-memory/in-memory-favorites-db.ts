import {
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Favorites } from 'src/interfaces/favorites.interface';

type Pathname = keyof Favorites;

export class InMemoryFavoritesDB {
  private _database: Favorites;
  constructor() {
    this._database = {
      albums: [],
      artists: [],
      tracks: [],
    };
  }

  async create(id: string, pathname: Pathname): Promise<boolean> {
    try {
      this._database[pathname].push(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('can not create');
    }
  }

  async findAll() {
    try {
      const collection = { ...this._database };
      return collection;
    } catch (error) {
      throw new InternalServerErrorException('can not found');
    }
  }

  async delete(id: string, pathname: Pathname) {
    try {
      const collection = this._database[pathname];
      const index = collection.findIndex((colId) => colId === id);
      if (index === -1) {
        throw new NotFoundException('Not Found');
      }
      collection.splice(index, 1);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new InternalServerErrorException('can not delete');
    }
  }

  async deleteId(id: string, pathname: Pathname) {
    try {
      const collection = this._database[pathname];
      const index = collection.findIndex((colId) => colId === id);
      if (index === -1) {
        collection.splice(index, 1);
      }
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new InternalServerErrorException('can not delete');
    }
  }
}
