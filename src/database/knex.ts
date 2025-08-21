// arquivo para fazer a conexão com o banco de dados usando Knex
import { knex as knexConfig } from "knex";

import config from "../../knexfile"; // Importa a configuração do Knex do arquivo knexfile.ts

export const knex = knexConfig(config); // Exporta a instância do Knex configurada
