import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf, IsUUID } from 'class-validator';
import { v4 as uuid4 } from 'uuid';

export class Track {
  @ApiProperty({
    type: String,
    example: uuid4(),
  })
  id: string;
  @ApiProperty({
    type: String,
  })
  name: string;
  @ApiProperty({
    type: String,
    nullable: true,
    example: uuid4(),
  })
  @ValidateIf((o) => o.artistId !== null)
  @IsUUID()
  artistId: string | null;
  @ApiProperty({
    type: String,
    nullable: true,
    example: uuid4(),
  })
  albumId: string | null;
  @ApiProperty({
    type: 'integer',
  })
  duration: number;
}
