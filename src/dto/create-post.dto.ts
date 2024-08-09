import { IsString, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly desc: string;

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

  @IsString()
  readonly userId: string;
}
