import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  #favoritesId: number;
  constructor(private readonly databaseService: PrismaService) {
    this.#favoritesId = 1234;
  }

  async findAll() {
    const favs = await this.databaseService.favorites.findMany({
      where: { id: this.#favoritesId },
      include: {
        albums: { select: { album: true } },
        tracks: { select: { track: true } },
        artists: { select: { artist: true } },
      },
    });

    if (favs.length === 0)
      return await this.databaseService.favorites.create({
        select: {
          albums: true,
          tracks: true,
          artists: true,
        },
      });

    const favorites = favs[0];
    return {
      tracks: favorites.tracks.map((trackInfo) => trackInfo.track),
      artists: favorites.artists.map((artistInfo) => artistInfo.artist),
      albums: favorites.albums.map((albumInfo) => albumInfo.album),
    };
  }

  async createTrack(id: string): Promise<string> {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.trackToFavorite.create({
        data: { favoritesId: this.#favoritesId, trackId: id },
      });

      return 'Added track to favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Track is not found`);
      } else throw error;
    }
  }

  async removeTrack(id: string) {
    try {
      await this.databaseService.trackToFavorite.delete({
        where: { trackId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Track is not found`);
      } else throw error;
    }
  }

  async createArtist(id: string): Promise<string> {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.artistToFavorite.create({
        data: { favoritesId: this.#favoritesId, artistId: id },
      });

      return 'Added artist to favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist is not found`);
      } else throw error;
    }
  }

  async removeArtist(id: string): Promise<void> {
    try {
      await this.databaseService.artistToFavorite.delete({
        where: { artistId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Artist is not found`);
      } else throw error;
    }
  }

  async createAlbum(id: string) {
    try {
      await this.databaseService.favorites.findMany();
      await this.databaseService.albumToFavorite.create({
        data: { favoritesId: this.#favoritesId, albumId: id },
      });

      return 'Added album to favorites';
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Album is not found`);
      } else throw error;
    }
  }

  async removeAlbum(id: string): Promise<void> {
    try {
      await this.databaseService.albumToFavorite.delete({
        where: { albumId: id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new UnprocessableEntityException(`Album is not found`);
      } else throw error;
    }
  }
}
