
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column()
  reviewName: string;

  @Column()
  description: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "userId"
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews) // Указываем связь "многие к одному" с сущностью Product
  @JoinColumn({ name: 'productId' }) // Укажите имя колонки для внешнего ключа, если оно отличается от "productId"
  product: Product;

  @ManyToOne(() => Purchase, (purchase) => purchase.reviews)
  @JoinColumn({ name: 'purchaseId' })
  purchase: Purchase;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
