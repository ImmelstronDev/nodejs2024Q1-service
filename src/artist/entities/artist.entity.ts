import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid4 } from 'uuid';

export class Artist {
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
    type: Boolean,
  })
  grammy: boolean;
}
