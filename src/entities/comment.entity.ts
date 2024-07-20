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
import { Like } from './like.entity';
import { Story } from './story.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Photo, (photo) => photo.comment)
  @JoinColumn({ name: 'photoId' })
  photo: Photo[];

  @OneToMany(() => Like, (like) => like.comment)
  likes: Like[];

  @ManyToOne(() => Story, (story) => story.comments)
  @JoinColumn({ name: 'storyId' })
  story: Story;

  @ManyToOne(() => Purchase, (purchase) => purchase.comments)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
