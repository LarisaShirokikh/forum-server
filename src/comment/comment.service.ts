import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from 'src/dto/create-comment.dto';

@Injectable()
export class CommentService {
  private readonly logger = new Logger(CommentService.name);
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { text, postId, userId } = createCommentDto;

    // Поиск поста и пользователя по их ID
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    this.logger.warn(post);
    if (!post) {
      throw new Error('Post not found');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    this.logger.warn(user);
    if (!user) {
      throw new Error('User not found');
    }

    const comment = new Comment();
    comment.text = text;
    comment.post = post;
    comment.user = user;
    this.logger.warn(comment);
    return this.commentsRepository.save(comment);
  }
}
