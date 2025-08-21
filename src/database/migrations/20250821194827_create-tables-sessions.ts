import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tables_sessions", (table) => {
    table.increments("id").primary(), // cria a coluna id como chave primária
      table
        .integer("table_id")
        .notNullable()
        .references("id")
        .inTable("tables"), // cria a coluna table_id como chave estrangeira referenciando a tabela "tables"
      table.timestamp("opened_at").defaultTo(knex.fn.now()), // cria a coluna opened_at com o timestamp atual por padrão, p saber quando a mesa foi aberta
      table.timestamp("closed_at"); // cria a coluna closed_at que pode ser nula, p saber se a mesa foi fechada ou não
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tables_sessions"); // remove a tabela table_sessions se existir, para desfazer a migração caso necessário
}
