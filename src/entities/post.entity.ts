// post.entity.ts

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
import { User } from './user.entity';
import { Photo } from './photo.entity';
import { Video } from './video.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { File } from './file.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column({ default: 0 })
  views: number;

  @OneToMany(() => Like, (like) => like.post) // Один пост может иметь много лайков
  likes: Like[];

  @OneToMany(() => Photo, (photo) => photo.post)
  photos?: Photo[];

  @OneToMany(() => Video, (video) => video.post)
  videos?: Video[];

  @OneToMany(() => File, (file) => file.post)
  files?: File[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
