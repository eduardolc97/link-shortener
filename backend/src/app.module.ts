import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { LinkModule } from './link/link.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    LinkModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // obrigatório
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      path: '/graphql',
    }),
    AuthModule,
  ],
})
export class AppModule {}
