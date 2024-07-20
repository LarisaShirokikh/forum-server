import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Purchase } from './purchase.entity';
import { Like } from './like.entity';
@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Post, (post) => post.videos)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => User, (user) => user.videos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Purchase, (purchase) => purchase.videos)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @OneToMany(() => Like, (like) => like.video) // Один пост может иметь много лайков
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
