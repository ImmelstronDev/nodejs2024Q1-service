import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
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
