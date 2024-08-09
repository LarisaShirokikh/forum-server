import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { Comment } from 'src/entities/comment.entity';

@Controller('comments')
export class CommentController {
  private readonly logger = new Logger(CommentController.name);
  constructor(private readonly commentsService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    // this.logger.warn('comment this', createCommentDto)
    return this.commentsService.create(createCommentDto);
  }
}
