import { OwnersService } from "./../owners/owners.service";
import { UpdateCatDto } from "./dto/update-cat.dto";
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
import { CatsGuard } from "./cats.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";

const pubSub = new PubSub();

@Resolver("Cat")
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
    private readonly ownersService: OwnersService
  ) {}

  @Query("cats")
  // @UseGuards(CatsGuard)
  async getCats(
    @Args("filter")
    args: UpdateCatDto
  ) {
    return this.catsService.findByFilter(args);
  }

  @Query("cat")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Cat> {
    return this.catsService.findOneById(id);
  }

  // @Query("cat")
  // async findOneById(
  //   @Args("queryCatDto")
  //   queryCatDto: UpdateCatDto
  // ): Promise<Cat> {
  //   return this.catsService.findByFilter(queryCatDto);
  // }

  @ResolveField()
  async owner(@Parent() cat: Cat & { ownerId: number }): Promise<Owner> {
    return this.ownersService.findOneById(cat.ownerId);
  }

  @Mutation("createCat")
  async create(@Args("createCatInput") args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish("catCreated", { catCreated: createdCat });
    return createdCat;
  }

  @Mutation("deleteCat")
  async delete(@Args("id") id: number): Promise<Cat> {
    const deletedCat = await this.catsService.delete(id);
    // pubSub.publish('catCreated', { catCreated: createdCat });
    return deletedCat;
  }

  @Mutation("updateCat")
  async update(@Args("updateCatInput") payload: UpdateCatDto): Promise<Cat> {
    const updateCat = await this.catsService.update(payload);
    // pubSub.publish('catCreated', { catCreated: createdCat });
    return updateCat;
  }

  @Subscription("catCreated")
  catCreated() {
    return pubSub.asyncIterator("catCreated");
  }
}
