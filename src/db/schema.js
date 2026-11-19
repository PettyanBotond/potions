const { mysqlTable, int, varchar } = require("drizzle-orm/mysql-core");

const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
});

const potions = mysqlTable("potions", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  effect: varchar("effect", { length: 255 }).notNull(),
  isDangerous: boolean("isDangerous").default(false),
});

module.exports = { users, potions };
