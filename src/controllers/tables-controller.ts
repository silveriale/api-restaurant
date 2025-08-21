import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";

class TablesController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // tenta executar o código dentro do bloco try
      const tables = await knex<TableRepository>("tables") // consulta a tabela "tables" no banco de dados
        .select() // seleciona todas as colunas
        .orderBy("table_number"); // ordena os resultados pelo número da mesa

      return response.json(tables); // devolve os resultados como JSON
    } catch (error) {
      // captura qualquer erro que ocorra durante a execução
      next(error); // passa o erro para o próximo middleware de tratamento de erros
    }
  }
}

export { TablesController };
