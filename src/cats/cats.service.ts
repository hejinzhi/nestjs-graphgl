import { UpdateCatDto } from "./dto/update-cat.dto";
import { Injectable } from "@nestjs/common";
import { Cat } from "../graphql.schema";
import * as _ from "lodash";

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: "White Cat", age: 6, ownerId: 1 },
    { id: 2, name: "Black Cat", age: 4, ownerId: 2 },
    { id: 3, name: "Kobes Cat", age: 5, ownerId: 2 },
  ];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  findCatsByOwnerId(ownerId: number) {
    return this.cats.filter((v) => v.ownerId === ownerId);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    const cat = this.cats.find((cat) => cat.id === id);
    if (cat) {
      cat.isOld = cat.age > 5 ? true : false;
    }
    return cat;
  }

  findByFilter(filter: UpdateCatDto) {
    if (filter.id) {
      filter.id = +filter.id;
    }
    return _.filter(this.cats, filter);
  }

  delete(id: number) {
    const index = this.cats.findIndex((v) => v.id === id);
    const cat = this.cats[index];
    this.cats.splice(index, 1);
    return cat;
  }

  update(payload: UpdateCatDto) {
    const index = this.cats.findIndex((v) => v.id === payload.id);
    if (index > -1) {
      this.cats[index] = Object.assign(this.cats[index], payload);
    }
    return this.cats[index];
  }
}
