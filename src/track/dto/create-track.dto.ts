import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export class CreateTrackDto {
  @ApiProperty({
    type: String,
    description: 'this is require property',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'this is require property',
    example: uuid4(),
  })
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null;
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'this is require property',
    example: uuid4(),
  })
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  albumId: string | null;
  @ApiProperty({
    type: 'integer',
    description: 'this is require property',
  })
  @IsNotEmpty()
  @IsInt()
  duration: number;
}
