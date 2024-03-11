import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: String,
    description: 'this property is required',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
  @ApiProperty({
    type: String,
    description: 'this property is required',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
