import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    type: String,
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
