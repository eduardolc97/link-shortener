import { Injectable } from '@nestjs/common';
import { LinkFiltersDto } from './dto/link-filters.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as crypto from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async createLink(url: string) {
    const shortCode = this.generateShortCode(url);
    return this.prisma.link.create({
      data: {
        originalUrl: url,
        shortCode,
      },
    });
  }

  private generateShortCode(url: string): string {
    return crypto.createHash('sha256').update(url).digest('hex').substring(0, 8);
  }

  async findByShorCode(shortCode: string) {
    return this.prisma.link.findUnique({
      where: {
        shortCode,
      },
    });
  }

  async findAll(filters: LinkFiltersDto) {
    let where: Prisma.LinkWhereInput = {};

    for (const [key, value] of Object.entries(filters)) {
      switch (key) {
        case 'originalUrl':
          where.originalUrl = value;
          break;
        case 'createdAt':
          where.createdAt = value;
          break;
        case 'shortCode':
          where.shortCode = value;
          break;
      }
    }
    return this.prisma.link.findMany({
      where,
    });
  }
}
