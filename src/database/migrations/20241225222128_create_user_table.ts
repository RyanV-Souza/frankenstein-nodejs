import { sql, type Kysely } from 'kysely'


export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
  .createTable("user")
  .addColumn("id", "serial", (col) => col.primaryKey())
  .addColumn("name", "text", (col) => col.notNull())
  .addColumn("email", "text", (col) => col.unique().notNull())
  .addColumn("password", "text", (col) => col.notNull())
  .addColumn("created_at", "timestamp", (col) =>
    col.defaultTo(sql`now()`).notNull(),
  )
  .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable("user").execute();
}
