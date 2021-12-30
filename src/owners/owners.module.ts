import { CatsService } from "./../cats/cats.service";
import { Module } from "@nestjs/common";
import { OwnersResolver } from "./owners.resolver";
import { OwnersService } from "./owners.service";

@Module({
  providers: [OwnersService, CatsService, OwnersResolver],
  exports: [OwnersService],
})
export class OwnersModule {}
