import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuid4 } from 'uuid';

export class User {
  @ApiProperty({
    type: String,
    example: uuid4(),
  })
  id: string;
  @ApiProperty({
    type: String,
  })
  login: string;
  password: string;
  @ApiProperty({
    type: 'integer',
  })
  version: number;
  @ApiProperty({
    type: 'integer',
  })
  createdAt: number;
  @ApiProperty({
    type: 'integer',
  })
  updatedAt: number;
}
