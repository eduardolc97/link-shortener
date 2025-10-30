import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('email') email: string, @Args('password') password: string): Promise<AuthResponse> {
    const user = await this.authService.register(email, password);
    const accessToken = this.authService.generateToken(user);
    return {
      accessToken,
      user: {
        email: user.email,
        id: user.id,
      },
    };
  }

  @Mutation(() => AuthResponse)
  async login(@Args('email') email: string, @Args('password') password: string): Promise<AuthResponse> {
    const user = await this.authService.login(email, password);
    const accessToken = this.authService.generateToken(user);
    return {
      accessToken,
      user: {
        email: user.email,
        id: user.id,
      },
    };
  }
}
