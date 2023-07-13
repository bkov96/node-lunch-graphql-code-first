import { ArgsType, Field, ID } from '@nestjs/graphql';
import { Owner as PrismaOwner } from '@prisma/client';
import { IsString, IsUUID } from 'class-validator';

export type IFindOwnerInput = Pick<PrismaOwner, 'id'>;

@ArgsType()
export class FindOwnerInput implements IFindOwnerInput {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  id: string;
}
