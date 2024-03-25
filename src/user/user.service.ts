import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './entities/user.entity';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma } from '@prisma/client';

// : Promise<Omit<User, 'password'>>
@Injectable()
export class UserService {
  constructor(private readonly databaseService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.databaseService.user.create({
      data: createUserDto,
    });
    return user;
  }

  async findAllUsers() {
    const users = await this.databaseService.user.findMany();
    return users;
  }

  async findOneUser(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User is not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { newPassword, oldPassword } = updateUserDto;
    const user = await this.databaseService.user.findUnique({
      where: { id: id },
    });
    if (!user) throw new NotFoundException(`User was not found`);
    if (user.password === oldPassword) {
      await this.databaseService.user.update({
        where: { id: id },
        data: { password: newPassword, version: { increment: 1 } },
      });
      return await this.databaseService.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          createdAt: true,
          login: true,
          updateAt: true,
          version: true,
        },
      });
    }
    throw new ForbiddenException(`User oldPassword is wrong`);
  }

  async removeUser(id: string) {
    try {
      return await this.databaseService.user.delete({ where: { id: id } });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User was not found`);
      } else {
        throw error;
      }
    }
  }
}
