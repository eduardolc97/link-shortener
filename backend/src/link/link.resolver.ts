import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LinkFiltersDto } from './dto/link-filters.dto';
import { LinkService } from './link.service';
import { Link } from './link.model';

@Resolver(() => Link)
export class LinkResolver {
  constructor(private readonly linkService: LinkService) {}

  @Mutation(() => Link)
  async createLink(@Args('url') url: string) {
    return this.linkService.createLink(url);
  }

  @Query(() => Link)
  async getLinkByShortCode(@Args('shortCode') shortCode: string) {
    return this.linkService.findByShorCode(shortCode);
  }

  @Query(() => [Link])
  async getLinks(@Args('filters') filters: LinkFiltersDto) {
    return this.linkService.findAll(filters);
  }
}
