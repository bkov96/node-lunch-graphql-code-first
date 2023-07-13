import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateCatInput } from './inputs/create-cat.input';
import { Cat as PrismaCat } from '@prisma/client';
import { IFindCatInput } from './inputs/find-cat.input';

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

  findCat(input: IFindCatInput): Promise<Nullable<PrismaCat>> {
    return this.prisma.cat.findUnique({ where: { id: input.id } });
  }

  findCats(): Promise<PrismaCat[]> {
    return this.prisma.cat.findMany();
  }

  findStrayCats(): Promise<PrismaCat[]> {
    return this.prisma.cat.findMany({
      where: {
        ownerId: null,
      },
    });
  }
}
