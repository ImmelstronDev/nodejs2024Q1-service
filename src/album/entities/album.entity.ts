import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid4 } from 'uuid';

export class Album {
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
    type: 'integer',
  })
  year: number;
  @ApiProperty({
    type: String,
    nullable: true,
    example: uuid4(),
  })
  artistId: string | null;
}
