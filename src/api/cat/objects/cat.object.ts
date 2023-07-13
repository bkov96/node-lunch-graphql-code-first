import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Cat as PrismaCat } from '@prisma/client';

export type CatSchema = Pick<PrismaCat, 'id' | 'name' | 'age' | 'ownerId'>;

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
  age: number | null;

  @Field(() => ID, { nullable: true })
  ownerId: string | null;
}
