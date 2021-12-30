import { UpdateCatDto } from "./dto/update-cat.dto";
import { Injectable } from "@nestjs/common";
import { Cat } from "../graphql.schema";

@Injectable()
export class CatsService {
  private readonly cats: Array<Cat & { ownerId?: number }> = [
    { id: 1, name: "Cat", age: 5, ownerId: 1 },
  ];

  create(cat: Cat): Cat {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOneById(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
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
