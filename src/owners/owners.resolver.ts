import { OwnersService } from "./owners.service";
import { ParseIntPipe, UseGuards } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Cat, Owner } from "../graphql.schema";
import { CatsService } from "../cats/cats.service";

const pubSub = new PubSub();

@Resolver("Owner")
export class OwnersResolver {
  constructor(
    private readonly catsService: CatsService,
    private readonly ownersService: OwnersService
  ) {}

  @Query("owners")
  async getOwners() {
    return this.ownersService.findAll();
  }

  @Query("owner")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Owner> {
    return this.ownersService.findOneById(id);
  }

  @ResolveField()
  async cats(
    @Parent() owner: Owner
  ): Promise<Array<Cat & { ownerId?: number }>> {
    return this.catsService.findCatsByOwnerId(owner.id);
  }

  // @Mutation("createCat")
  // async create(@Args("createCatInput") args: CreateCatDto): Promise<Cat> {
  //   const createdCat = await this.catsService.create(args);
  //   pubSub.publish("catCreated", { catCreated: createdCat });
  //   return createdCat;
  // }

  // @Mutation("deleteCat")
  // async delete(@Args("id") id: number): Promise<Cat> {
  //   const deletedCat = await this.catsService.delete(id);
  //   // pubSub.publish('catCreated', { catCreated: createdCat });
  //   return deletedCat;
  // }

  // @Mutation("updateCat")
  // async update(@Args("updateCatInput") payload: UpdateCatDto): Promise<Cat> {
  //   const updateCat = await this.catsService.update(payload);
  //   // pubSub.publish('catCreated', { catCreated: createdCat });
  //   return updateCat;
  // }

  // @Subscription("catCreated")
  // catCreated() {
  //   return pubSub.asyncIterator("catCreated");
  // }
}
