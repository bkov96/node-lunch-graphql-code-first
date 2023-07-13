import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PrismaModule } from './common/prisma/prisma.module';
import { OwnerModule } from './api/owner/owner.module';
import { CatModule } from './api/cat/cat.module';

@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
    }),
    OwnerModule,
    CatModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
