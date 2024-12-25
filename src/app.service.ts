import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { DATABASE_CONNECTION } from "./database/database.module";
import Database from "./database/schema/Database";

@Injectable()
export class AppService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Kysely<Database>) {}

  async findManyUsers() {
    const users = await this.db.selectFrom("user").select(["id", "email"]).execute();

    return users;
  }
}
