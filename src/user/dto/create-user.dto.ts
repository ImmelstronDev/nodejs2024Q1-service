import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'this property is required',
  })
  @IsString()
  @IsNotEmpty()
  login: string;
  @ApiProperty({
    type: String,
    description: 'this property is required',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
