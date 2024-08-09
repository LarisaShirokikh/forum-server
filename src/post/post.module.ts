import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Video } from 'src/entities/video.entity';
import { File } from 'src/entities/file.entity';
import { Photo } from 'src/entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, File, Video, Photo]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PostController],
  providers: [PostService, UserService, JwtService],
})
export class PostModule {}
