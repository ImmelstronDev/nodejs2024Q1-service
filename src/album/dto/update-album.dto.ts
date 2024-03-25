import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsUUID,
  ValidateIf,
  IsString,
} from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({
    type: String,
    description: 'this require property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: 'integer',
    description: 'this require property',
  })
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ApiProperty({
    type: String,
    nullable: true,
    example: uuid4(),
    description: 'this require property',
  })
  @IsUUID()
  @ValidateIf((o) => o.artistId !== null)
  artistId: string | null;
}
