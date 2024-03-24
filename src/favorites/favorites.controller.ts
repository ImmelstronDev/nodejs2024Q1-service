import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Header,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoriteEntity } from './entities/favorite.entity';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('/track/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'created success',
    type: CreateFavoriteDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'unprocessable Entity, entity does not exist',
  })
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    const msg = await this.favoritesService.createTrack(id);
    return { msg };
  }

  @Post('/artist/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'created success',
    type: CreateFavoriteDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'unprocessable Entity, entity does not exist',
  })
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    const msg = await this.favoritesService.createArtist(id);
    return { msg };
  }

  @Post('/album/:id')
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    description: 'created success',
    type: CreateFavoriteDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnprocessableEntityResponse({
    description: 'unprocessable Entity, entity does not exist',
  })
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const msg = await this.favoritesService.createAlbum(id);
    return { msg };
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    type: FavoriteEntity,
    description: 'success',
  })
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Delete('track/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'Track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, trackId is invalid',
  })
  removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('artist/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'Artist not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, ArtistId is invalid',
  })
  removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('album/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'success',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, AlbumId is invalid',
  })
  removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
