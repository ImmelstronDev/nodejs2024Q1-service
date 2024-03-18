import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const userPayload = {
      id: uuid4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...createUserDto,
    };

    const user = await this.databaseService.users.create(userPayload);
    delete user.password;
    return user;
  }

  async findAllUsers() {
    const users = await this.databaseService.users.findAll();
    const res = users.map((user) => {
      delete user.password;
      return user;
    });
    return res;
  }

  async findOneUser(id: string) {
    const user = await this.databaseService.users.findOne(id);
    if (!user) {
      throw new NotFoundException('User is not found');
    }

    delete user.password;
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.users.update(id, updateUserDto);
    delete user.password;
    return user;
  }

  async removeUser(id: string) {
    return this.databaseService.users.delete(id);
  }
}
