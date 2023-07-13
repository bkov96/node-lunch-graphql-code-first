import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { Owner } from './objects/owner.object';
import { OwnerService } from './owner.service';
import { CreateOwnerInput } from './inputs/create-owner.input';
import { FindOwnerInput } from './inputs/find-owner.input';
import { Cat } from '../cat/objects/cat.object';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

  @ResolveField()
  async cats(@Root() owner: Owner): Promise<Cat[]> {
    const prismaCats = await this.ownerService.findRelatedCats(owner.id);

    return prismaCats.map(
      (prismaCat) =>
        new Cat({
          id: prismaCat.id,
          name: prismaCat.name,
          age: prismaCat.age,
          owner,
        }),
    );
  }

  @Mutation(() => Owner)
  async createOwner(@Args() input: CreateOwnerInput): Promise<Owner> {
    const prismaOwner = await this.ownerService.createOwner(input);

    return new Owner({
      id: prismaOwner.id,
      firstName: prismaOwner.firstName,
      lastName: prismaOwner.lastName,
      cats: [],
    });
  }

  @Query(() => Owner)
  async findOwner(@Args() input: FindOwnerInput): Promise<Nullable<Owner>> {
    const prismaOwner = await this.ownerService.findOwner(input);

    if (!prismaOwner) {
      return null;
    }

    return new Owner({
      id: prismaOwner.id,
      firstName: prismaOwner.firstName,
      lastName: prismaOwner.lastName,
    });
  }

  @Query(() => [Owner])
  async findOwners(): Promise<Owner[]> {
    const prismaOwners = await this.ownerService.findOwners();

    return prismaOwners.map(
      (prismaOwner) =>
        new Owner({
          id: prismaOwner.id,
          firstName: prismaOwner.firstName,
          lastName: prismaOwner.lastName,
        }),
    );
  }
}
