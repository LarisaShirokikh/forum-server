import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsArray()
  @IsOptional()
  @Type(() => String)
  readonly photos?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  readonly videos?: string[];

  @IsArray()
  @IsOptional()
  @Type(() => String)
  readonly files?: string[];
}
