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
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @Header('content-type', 'application/json')
  @ApiCreatedResponse({
    type: Track,
    description: 'track created success',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.createTrack(createTrackDto);
  }

  @Get()
  @Header('content-type', 'application/json')
  @ApiOkResponse({
    type: Track,
    description: 'success',
  })
  findAll() {
    return this.trackService.findAllTracks();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  @ApiOkResponse({
    type: Track,
    description: 'success',
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track is not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.findTrack(id);
  }

  @Put(':id')
  @Header('content-type', 'application/json')
  @ApiOkResponse({
    type: Track,
    description: 'updated was success',
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track is not found',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
      }),
    )
    id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @Header('content-type', 'application/json')
  @ApiNoContentResponse({
    description: 'deleted was success',
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid id' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.trackService.removeTrack(id);
  }
}
