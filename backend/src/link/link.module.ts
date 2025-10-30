import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkResolver } from './link.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LinkService, LinkResolver, PrismaService],
})
export class LinkModule {}
