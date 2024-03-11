import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpStatus,
  Put,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Header('content-type', 'application/json')
  @Post()
  @ApiCreatedResponse({
    type: User,
    description: 'Created',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Header('content-type', 'application/json')
  @Get()
  @ApiOkResponse({
    type: [User],
    description: 'success',
  })
  async findAll() {
    return this.userService.findAllUsers();
  }

  @Header('content-type', 'application/json')
  @Get(':id')
  @ApiOkResponse({
    type: User,
    description: 'success',
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user is not found',
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.findOneUser(id);
  }

  @Header('content-type', 'application/json')
  @Put(':id')
  @ApiOkResponse({
    description: 'updated successfully',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'Bad request, invalid id' })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user is not found',
  })
  @ApiForbiddenResponse({
    description: 'oldPassword is wrong',
  })
  update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Header('content-type', 'application/json')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'deleted successfully',
  })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.removeUser(id);
  }
}
