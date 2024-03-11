import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Favorites } from 'src/interfaces/favorites.interface';
type Pathname = keyof Favorites;
@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(id: string, path: Pathname) {
    return await this.databaseService.create(id, path);
  }

  async findAll() {
    return await this.databaseService.findAll();
  }

  async remove(id: string, path: Pathname) {
    return this.databaseService.favorites.delete(id, path);
  }
}
