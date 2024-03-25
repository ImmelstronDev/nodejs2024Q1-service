import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpStatus,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Album } from './entities/album.entity';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    type: Album,
    description: 'created success',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({ type: Album, description: 'success' })
  findAll() {
    return this.albumService.findAllAlbums();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({ type: Album, description: 'success' })
  @ApiBadRequestResponse({ description: 'Bad Request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.findAlbum(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    type: Album,
    description: 'updated was success',
  })
  @ApiBadRequestResponse({ description: 'Bad Request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Album not found',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'deleted was success',
  })
  @ApiNotFoundResponse({ description: 'Album not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid id',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumService.removeAlbum(id);
  }
}
