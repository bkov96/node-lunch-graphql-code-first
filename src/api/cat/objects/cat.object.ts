import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cat as PrismaCat } from '@prisma/client';
import { Owner } from 'src/api/owner/objects/owner.object';

export type CatSchema = Pick<PrismaCat, 'id' | 'name' | 'age' | 'ownerId'> & {
  owner: Owner;
};

@ObjectType()
export class Cat implements CatSchema {
  constructor(catSchema: Partial<CatSchema>) {
    Object.assign(this, catSchema);
  }

  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Number, { nullable: true })
  age: Nullable<number>;

  @Field(() => ID, { nullable: true })
  ownerId: Nullable<string>;

  @Field(() => Owner, { nullable: true })
  owner: Nullable<Owner>;
}
