import { Injectable } from '@nestjs/common';
import { Owner as PrismaOwner } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ICreateOwnerInput } from './inputs/create-owner.input';
import { IFindOwnerInput } from './inputs/find-owner.input';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  createOwner(createOwnerInput: ICreateOwnerInput): Promise<PrismaOwner> {
    return this.prisma.owner.create({
      data: {
        firstName: createOwnerInput.firstName,
        lastName: createOwnerInput.lastName,
      },
    });
  }

  findOwner(findOwnerInput: IFindOwnerInput): Promise<Nullable<PrismaOwner>> {
    return this.prisma.owner.findUnique({ where: { id: findOwnerInput.id } });
  }
}
