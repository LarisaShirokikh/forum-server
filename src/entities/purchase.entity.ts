import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';
import { Video } from './video.entity';
import { Follower } from './follower.entity';
import { Review } from './review.entity';
import { Product } from './product.entity';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemName: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Photo, (photo) => photo.purchase)
  photos: Photo[];

  @OneToMany(() => Video, (video) => video.purchase)
  videos: Video[];

  @OneToMany(() => Like, (like) => like.purchase)
  likes: Like[];

  @OneToMany(() => Follower, (follower) => follower.purchase)
  followers: Follower[];

  @OneToMany(() => Comment, (comment) => comment.purchase)
  comments: Comment[];

  @OneToMany(() => Review, (review) => review.purchase)
  reviews: Review[];

  @ManyToOne(() => Product, (product) => product.purchas)
  product: Product[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
