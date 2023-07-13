import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Cat } from './objects/cat.object';
import { CatService } from './cat.service';
import { CreateCatInput } from './inputs/create-cat.input';

@Resolver(() => Cat)
export class CatResolver {
  constructor(private readonly catService: CatService) {}

  @Mutation(() => Cat)
  async createCat(@Args() input: CreateCatInput): Promise<Cat> {
    const prismaCat = await this.catService.createCat(input);

    return new Cat({
      id: prismaCat.id,
      name: prismaCat.name,
      age: prismaCat.age,
    });
  }
}
