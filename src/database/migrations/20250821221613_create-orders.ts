import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("orders", (table) => {
    table.increments("id").primary(), // Cria a coluna id como chave primária e auto-incremento
      table
        .integer("table_session_id")
        .notNullable()
        .references("id")
        .inTable("tables_sessions"), // Cria a coluna table_session_id que não pode ser nula e referencia a tabela tables_sessions
      table
        .integer("product_id")
        .notNullable()
        .references("id")
        .inTable("products"), // Cria a coluna product_id que não pode ser nula e referencia a tabela products
      table.integer("quantity").notNullable(), // Cria a coluna quantity que não pode ser nula
      table.decimal("price").notNullable(), // Cria a coluna price que não pode ser nula
      table.timestamp("created_at").defaultTo(knex.fn.now()), // Cria a coluna created_at com o horário atual como padrão
      table.timestamp("updated_at").defaultTo(knex.fn.now()); // Cria a coluna update_at com o horário atual como padrão
  });
}

export async function down(knex: Knex): Promise<void> {}
