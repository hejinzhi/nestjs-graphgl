import { UpdateCatDto } from "./dto/update-cat.dto";
import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { Cat } from "../graphql.schema";
import { CatsGuard } from "./cats.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";

const pubSub = new PubSub();

@Resolver("Cat")
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query("cats")
  @UseGuards(CatsGuard)
  async getCats() {
    return this.catsService.findAll();
  }

  @Query("cat")
  async findOneById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Cat> {
    console.log(id);
    return this.catsService.findOneById(id);
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
