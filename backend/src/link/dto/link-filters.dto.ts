import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsDate } from 'class-validator';

@InputType()
export class LinkFiltersDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  originalUrl?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  createdAt?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  shortCode?: string;
}
