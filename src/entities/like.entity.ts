import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
import { Video } from './video.entity';
import { Photo } from './photo.entity';
import { Purchase } from './purchase.entity';
import { Story } from './story.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Story, (story) => story.likes)
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @ManyToOne(() => Purchase, (purchase) => purchase.likes)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @ManyToOne(() => Video, (video) => video.likes)
  @JoinColumn({ name: 'videoId' })
  video: Video;

  @ManyToOne(() => Photo, (photo) => photo.likes)
  @JoinColumn({ name: 'photoId' })
  photo: Photo;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
