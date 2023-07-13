import { ArgsType, Field } from '@nestjs/graphql';
import { Cat as PrismaCat } from '@prisma/client';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
} from 'class-validator';

export type ICreateCatInput = Pick<PrismaCat, 'name' | 'age' | 'ownerId'>;

@ArgsType()
export class CreateCatInput implements ICreateCatInput {
  @Field(() => String)
  @IsString()
  @Length(1, 128)
  name: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(128)
  age: Nullable<number>;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @IsUUID()
  ownerId: Nullable<string>;
}
