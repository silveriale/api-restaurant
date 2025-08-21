import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  //Cria a tabela de produtos
  await knex.schema.createTable("products", (table) => {
    table.increments("id").primary(); // Chave primária
    table.text("name").notNullable(); // Nome do produto
    table.decimal("price").notNullable(); // Preço do produto
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Data de criação
    table.timestamp("updated_at").defaultTo(knex.fn.now()); // Data de atualização
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("products"); // Remove a tabela de produtos caso necessário
}
