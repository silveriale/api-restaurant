import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tables", (table) => {
    // cria a tabela 'tables' com as colunas especificadas
    table.increments("id").primary(); // cria a coluna 'id' como chave primária auto-incrementada
    table.integer("table_number").notNullable(); // cria a coluna 'table_number' como inteiro não nulo;
    table.timestamp("created_at").defaultTo(knex.fn.now()); // cria a coluna 'created_at' como timestamp com valor padrão da data e hora atual
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // cria a coluna 'updated_at' como timestamp com valor padrão da data e hora atual
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tables"); // remove a tabela 'tables' caso a migration seja revertida
}
