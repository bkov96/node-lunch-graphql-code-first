import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Cat as PrismaCat } from '@prisma/client';
import { IsString, IsUUID } from 'class-validator';

export type IFindCatInput = Pick<PrismaCat, 'id'>;

@ArgsType()
export class FindCatInput implements IFindCatInput {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
