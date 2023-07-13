import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Cat } from './objects/cat.object';
import { CatService } from './cat.service';
import { CreateCatInput } from './inputs/create-cat.input';
import { FindCatInput } from './inputs/find-cat.input';

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

  @Query(() => Cat)
  async findCat(@Args() input: FindCatInput): Promise<Nullable<Cat>> {
    const prismaCat = await this.catService.findCat(input);

    if (!prismaCat) {
      return null;
    }

    return new Cat({
      id: prismaCat.id,
      name: prismaCat.name,
      age: prismaCat.age,
    });
  }

  @Query(() => [Cat])
  async findCats(): Promise<Cat[]> {
    const prismaCats = await this.catService.findCats();

    return prismaCats.map(
      (prismaCat) =>
        new Cat({
          id: prismaCat.id,
          name: prismaCat.name,
          age: prismaCat.age,
        }),
    );
  }

  @Query(() => [Cat])
  async findStrayCats(): Promise<Cat[]> {
    const prismaCats = await this.catService.findStrayCats();

    return prismaCats.map(
      (prismaCat) =>
        new Cat({
          id: prismaCat.id,
          name: prismaCat.name,
          age: prismaCat.age,
          owner: null,
        }),
    );
  }
}
