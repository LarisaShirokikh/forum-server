import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from 'src/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('User reg:', createUserDto);
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser)
      throw new BadRequestException('Такой email уже зарегистрирован');

    const user = await this.userRepository.save({
      name: createUserDto.name,
      email: createUserDto.email,
      password: await argon2.hash(createUserDto.password),
    });

    const expiresIn = 24 * 60 * 60;
    const token = this.jwtService.sign(
      { email: createUserDto.email },
      { expiresIn },
    );
    return { user, token };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateProfile(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    console.log('user', user);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async getProfile(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async uploadAvatar(userId: number, filename: string): Promise<User> {
    const user = await this.getProfile(userId);
    user.avatar = `/uploads/avatars/${filename}`;
    await this.userRepository.save(user);
    return user;
  }

  async updateLastSeen(userId: number): Promise<void> {
    await this.userRepository.update(userId, { lastSeen: new Date() });
  }
}
