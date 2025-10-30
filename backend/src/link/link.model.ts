import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Link {
  @Field(() => ID)
  id: string;

  @Field()
  originalUrl: string;

  @Field()
  shortCode: string;
}
