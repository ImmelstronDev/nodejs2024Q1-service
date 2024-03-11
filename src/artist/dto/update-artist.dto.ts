import { PartialType } from '@nestjs/mapped-types';
import { CreateArtistDto } from './create-artist.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    type: String,
    description: 'this is require property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: Boolean,
    description: 'this is require property',
  })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
