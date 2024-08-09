import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Purchase } from './purchase.entity';
import { Post } from './post.entity';
import { Follower } from './follower.entity';
import { ConfirmationCode } from './confirmation-code.entity';
import { Product } from './product.entity';
import { Photo } from './photo.entity';
import { Like } from './like.entity';
import { Medal } from './medal.entity';
import { Group } from './group.entity';
import { Video } from './video.entity';
import { Topic } from './topic.entity';
import {Comment} from './comment.entity'
import { Story } from './story.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  cover?: string;

  @Column({ nullable: true })
  surname?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ default: 0 })
  baby?: number;

  @Column({ nullable: true })
  work?: string;

  @Column({ nullable: true })
  website?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: 0 })
  karma?: number;

  @Column('simple-array', { default: 'Пользователь' })
  roles: (
    | 'Пользователь'
    | 'Модератор'
    | 'Админ'
    | 'Суперадмин'
    | 'Организатор'
  )[];

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastSeen?: Date;

  @OneToMany(() => Review, (review) => review.user)
  reviews?: Review[];

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases?: Purchase[];

  @OneToMany(() => Topic, (topic) => topic.user)
  topics?: Topic[];

  @OneToMany(() => Video, (video) => video.user)
  videos?: Video[];

  @OneToMany(() => Story, (story) => story.user)
  stories?: Story[];

  @OneToMany(() => Post, (post) => post.user)
  posts?: Post[];

  @OneToMany(() => Group, (group) => group.user)
  groups?: Group[];

  @OneToMany(() => Medal, (medal) => medal.user)
  medalsReceived?: Medal[];

  @OneToMany(() => Follower, (follower) => follower.follower)
  followers?: Follower[];

  @OneToMany(() => Follower, (follower) => follower.following)
  followings?: Follower[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @OneToMany(
    () => ConfirmationCode,
    (confirmationCode) => confirmationCode.user,
  )
  confirmationCodes?: ConfirmationCode[];

  @OneToMany(() => Like, (like) => like.user)
  likes?: Like[];

  @OneToMany(() => Product, (product) => product.user)
  products?: Product[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos?: Photo[];
}
