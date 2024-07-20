import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { Category } from './category.entity';
import { User } from './user.entity';
import { Purchase } from './purchase.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: 'Имя продукта не может быть пустым' })
  @IsString({ message: 'Имя продукта должно быть строкой' })
  @Column()
  name: string;

  @ManyToMany(() => Category, (category) => category.product)
  category: Category[];
  @Column({ default: null })
  categoryId: string;

  @IsBoolean()
  @Column({ default: true })
  inStock: boolean;

  @IsOptional()
  @Column({ nullable: true })
  construction: string;

  @IsOptional()
  @Column({ nullable: true })
  sealingContours: string;

  @IsOptional()
  @Column({ nullable: true })
  thicknessWeight: string;

  @IsOptional()
  @Column({ nullable: true })
  weight: string;

  @IsOptional()
  @Column({ nullable: true })
  insulation: string;

  @IsOptional()
  @Column({ nullable: true })
  mainLock: string;

  @IsOptional()
  @Column({ nullable: true })
  additionalLock: string;

  @IsOptional()
  @Column({ nullable: true })
  exteriorFinish: string;

  @IsOptional()
  @Column({ nullable: true })
  interiorFinish: string;

  @IsOptional()
  @Column({ nullable: true })
  hinges: string;

  @IsOptional()
  @Column({ nullable: true })
  doorProtection: string;

  @IsOptional()
  @Column({ nullable: true })
  oldPrice: number;

  @IsNotEmpty({ message: 'Новая цена продукта не может быть пустой' })
  @IsNumber({}, { message: 'Новая цена продукта должна быть числом' })
  @Column()
  newPrice: number;

  @IsOptional()
  @Column({ default: false })
  isOnSale: boolean;

  @IsOptional()
  @Column({ default: false })
  isNew: boolean;

  @IsOptional()
  @Column({ nullable: true })
  description: string;

  @Column('simple-array', { nullable: true })
  photo: string[];

  @OneToMany(() => Review, (review) => review.product) // Указываем связь "один ко многим" с сущностью Review
  reviews: Review[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Purchase, (purchase) => purchase.product)
  @JoinColumn({ name: 'purchasId' })
  purchas: Purchase;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
