import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Owner as PrismaOwner } from '@prisma/client';
import { Cat } from 'src/api/cat/objects/cat.object';

export type OwnerSchema = Pick<PrismaOwner, 'id' | 'firstName' | 'lastName'>;

@ObjectType()
export class Owner implements OwnerSchema {
  constructor(ownerSchema: Partial<OwnerSchema>) {
    Object.assign(this, ownerSchema);
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => [Cat])
  cats: Cat[];
}
