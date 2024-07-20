import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Purchase } from './purchase.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  url: string;

  @ManyToOne(() => Post, (post) => post.photos)
  @JoinColumn({ name: 'postId' })
  post: Post;

  @ManyToOne(() => Purchase, (purchase) => purchase.photos)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Like, (like) => like.photo)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.photo)
  comment: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
