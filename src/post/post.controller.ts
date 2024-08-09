// src/posts/posts.controller.ts
import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFiles,
  Get,
  Req,
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { MulterFile } from 'src/types/types';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'photos', maxCount: 10 },
        { name: 'videos', maxCount: 10 },
        { name: 'files', maxCount: 10 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      },
    ),
  )
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    uploadedFiles: {
      files?: MulterFile[];
      photos?: MulterFile[];
      videos?: MulterFile[];
    },
  ) {
    const photoUrls = uploadedFiles?.photos
      ? uploadedFiles.photos.map((file) => `/uploads/${file.filename}`)
      : [];
    const videoUrls = uploadedFiles?.videos
      ? uploadedFiles.videos.map((file) => `/uploads/${file.filename}`)
      : [];
    const fileUrls = uploadedFiles?.files
      ? uploadedFiles.files.map((file) => `/uploads/${file.filename}`)
      : [];

    return this.postService.create({
      ...createPostDto,
      photos: photoUrls,
      videos: videoUrls,
      files: fileUrls,
    });
  }

  @Get()
  async findAll(@Req() req) {
    return this.postService.findAll();
  }

  @Post(':id/views')
  async updateViews(@Param('id') id: string) {
    await this.postService.updateViews(id);
    return { message: 'Views updated' };
  }
}
