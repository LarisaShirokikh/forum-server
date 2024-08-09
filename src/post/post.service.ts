import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { Photo } from 'src/entities/photo.entity';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Video } from 'src/entities/video.entity';
import { File } from 'src/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const { userId, photos, videos, files, ...rest } = createPostDto;
    const user = await this.userRepository.findOne({
      where: { id: parseInt(userId, 10) },
    });
    const newPost = this.postRepository.create({ ...rest, user });
    const savedPost = await this.postRepository.save(newPost);

    if (photos && photos.length > 0) {
      const photoEntities = photos.map((url) =>
        this.photoRepository.create({
          filename: url.split('/').pop(),
          url,
          post: savedPost,
        }),
      );
      await this.photoRepository.save(photoEntities);
    }

    if (videos && videos.length > 0) {
      const videoEntities = videos.map((url) =>
        this.videoRepository.create({
          filename: url.split('/').pop(),
          url,
          post: savedPost,
        }),
      );
      await this.videoRepository.save(videoEntities);
    }

    if (files && files.length > 0) {
      const fileEntities = files.map((url) =>
        this.fileRepository.create({
          filename: url.split('/').pop(),
          url,
          post: savedPost,
        }),
      );
      await this.fileRepository.save(fileEntities);
    }

    return savedPost;
  }

  async findAll() {
    const posts = await this.postRepository.find({
      relations: ['photos', 'videos', 'files', 'user'],
    });

    return posts;
  }

  async updateViews(postId: string): Promise<void> {
    await this.postRepository.increment({ id: Number(postId) }, 'views', 1);
  }
}
