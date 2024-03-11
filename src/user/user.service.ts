import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const user = {
      id: uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    return await this.databaseService.addUser(user);
  }

  async findAll() {
    return this.databaseService.findAllUsers();
  }

  async findOne(id: string) {
    const user = await this.databaseService.findOneUser(id);

    delete user.password;
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.updateUser(id, updateUserDto);
    delete user.password;
    return user;
  }

  async remove(id: string) {
    return await this.databaseService.removeUser(id);
  }
}
