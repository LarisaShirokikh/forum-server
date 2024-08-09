import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createUserDto: CreateUserDto) {
    console.log('User registered successfully:', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('email')
  async getUserByEmail(@Query('email') email: string) {
    const user = await this.userService.findOne(email);
    if (user) {
      // Доступ к ролям через индексы массива roles
      const ADMIN = user.roles.includes('Админ');
      const SUPERADMIN = user.roles.includes('Суперадмин');
      return { ADMIN, SUPERADMIN };
    } else {
      return { error: 'Пользователь не найден' };
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
