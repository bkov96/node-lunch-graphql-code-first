import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Owner } from './objects/owner.object';
import { OwnerService } from './owner.service';
import { CreateOwnerInput } from './inputs/create-owner.input';

@Resolver(() => Owner)
export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) {}

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
}
