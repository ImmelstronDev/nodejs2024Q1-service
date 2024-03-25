import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform } from 'class-transformer';
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

  @ApiProperty({
    type: 'integer',
  })
  version: number;

  @ApiProperty({
    type: Number,
  })
  @Transform(({ value }) => new Date(value).getTime())
  createdAt: number | Date;

  @ApiProperty({
    type: Number,
  })
  @Transform(({ value }) => new Date(value).getTime())
  updatedAt: number | Date;

  @Exclude()
  password: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
