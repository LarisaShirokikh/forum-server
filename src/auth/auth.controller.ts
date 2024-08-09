import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Req,
  NotFoundException,
  ValidationPipe,
  Patch,
  UsePipes,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
  Param,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { extname, join } from 'path';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req): Promise<User> {
    this.logger.log(`Getting profile for user ID: ${req.user.id}`);
    const userId = req.user.id;
    const user = await this.userService.getProfile(userId);
    if (!user) {
      this.logger.warn(`User not found: ${userId}`);
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/verify')
  async verifyToken(@Request() req) {
    try {
      return true;
    } catch (error) {
      return false;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/:id')
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ): Promise<User> {
      this.logger.log(
        `Request to update profile ID: ${id} by user ID: ${req.user.id}`,
      );
      const userId = parseInt(req.user.id, 10); // Приведение к числовому типу
      const profileId = parseInt(id as unknown as string, 10); // Приведение к числовому типу
      if (userId !== profileId) {
        this.logger.warn(
          `Unauthorized profile update attempt by user ID: ${userId} for profile ID: ${profileId}`,
        );
        throw new UnauthorizedException('You can only update your own profile');
      }
this.logger.log(`Updating profile for user ID: ${req.user.id}`);
    return this.userService.updateProfile(id, updateUserDto);
  }

  @Post('profile/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads', 'avatars'),
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
          return cb(
            new BadRequestException('Разрешены только изображения'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    if (!file) {
      throw new BadRequestException('Файл не загружен');
    }
    return this.userService.uploadAvatar(req.user.id, file.filename);
  }
}
