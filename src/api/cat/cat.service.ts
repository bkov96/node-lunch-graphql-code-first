import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateCatInput } from './inputs/create-cat.input';
import { Cat as PrismaCat } from '@prisma/client';

@Injectable()
export class CatService {
  constructor(private prisma: PrismaService) {}

  createCat(input: ICreateCatInput): Promise<PrismaCat> {
    if (!input.ownerId) {
      return this.createStrayCat(input);
    }

    return this.prisma.cat.create({
      data: {
        name: input.name,
        age: input.age,
        owner: {
          connect: {
            id: input.ownerId,
          },
        },
      },
    });
  }

  createStrayCat(input: Omit<ICreateCatInput, 'ownerId'>): Promise<PrismaCat> {
    return this.prisma.cat.create({
      data: {
        name: input.name,
        age: input.age,
      },
    });
  }
}
