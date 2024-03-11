import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  Put,
  HttpStatus,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @ApiCreatedResponse({
    type: Artist,
    description: 'created success',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.createArtist(createArtistDto);
  }

  @Get()
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({ type: Artist, description: 'success' })
  findAll() {
    return this.artistService.findAllArtists();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({ type: Artist, description: 'success' })
  @ApiBadRequestResponse({ description: 'Bad Request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.findArtist(id);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @ApiOkResponse({
    type: Artist,
    description: 'updated was success',
  })
  @ApiBadRequestResponse({ description: 'Bad Request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Artist not found',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistService.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'deleted was success',
  })
  @ApiNotFoundResponse({ description: 'track not found' })
  @ApiBadRequestResponse({
    description: 'Bad Request, invalid id',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistService.removeArtist(id);
  }
}
