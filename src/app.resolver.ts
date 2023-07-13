import { Resolver, Query } from '@nestjs/graphql';

@Resolver('Root')
export class AppResolver {
  @Query(() => String)
  testConnection(): string {
    return 'Connection is estabilished';
  }
}
