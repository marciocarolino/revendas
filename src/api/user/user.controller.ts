import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/db/entity/user.entity';
import { CreateUserDto } from './dto/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<{ users: User[]; total: number }> {
    return this.userService.findAll(page, perPage);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  async saveUser(@Body() usertDto: CreateUserDto): Promise<User> {
    return this.userService.saveUser(usertDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    return await this.userService.disableUser(id);
  }
}
