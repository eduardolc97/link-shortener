import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthResponse {
  @Field()
  accessToken: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class User {
  @Field()
  email: string;

  @Field()
  id: string;
}