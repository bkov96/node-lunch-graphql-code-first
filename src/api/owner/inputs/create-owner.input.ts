import { Field, ArgsType } from '@nestjs/graphql';
import { Owner as PrismaOwner } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export type ICreateOwnerInput = Pick<PrismaOwner, 'firstName' | 'lastName'>;

@ArgsType()
export class CreateOwnerInput implements ICreateOwnerInput {
  @Field(() => String)
  @IsString()
  @Length(1, 128)
  firstName: string;

  @Field(() => String)
  @IsString()
  @Length(1, 128)
  lastName: string;
}
