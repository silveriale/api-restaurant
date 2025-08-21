import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex";
import { z } from "zod";

class TablesSessionsController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      // Valida o corpo da requisição usando zod
      const bodySchema = z.object({
        // Define o esquema de validação
        table_id: z.number(), // Define que table_id deve ser um número
      });

      const { table_id } = bodySchema.parse(request.body); // Extrai table_id do corpo da requisição

      const session = await knex<TablesSessionsRepository>("tables_sessions") // Consulta a tabela tables_sessions
        .where({ table_id }) // Filtra por table_id
        .orderBy("opened_at", "desc") // Ordena por opened_at em ordem decrescente
        .first(); // Obtém a primeira sessão encontrada

      if (session && !session.closed_at) {
        // Verifica se a sessão já está aberta
        throw new AppError("A mesa já está aberta"); // Lança um erro se a mesa já estiver aberta
      }

      await knex<TablesSessionsRepository>("tables_sessions").insert({
        // Insere uma nova sessão na tabela tables_sessions
        table_id,
        opened_at: knex.fn.now(), // Define opened_at como o horário atual
      });

      return response.status(201).json(); // Retorna um status 201 (Criado) sem corpo
    } catch (error) {
      next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      // Consulta todas as sessões de mesa ordenadas por closed_at
      const sessions = await knex<TablesSessionsRepository>( // Consulta a tabela tables_sessions
        "tables_sessions"
      ).orderBy("closed_at"); // Ordena por closed_at

      return response.json(sessions); // Retorna as sessões encontradas em formato JSON
    } catch (error) {
      next(error); // Passa o erro para o próximo middleware de tratamento de erros
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((value) => Number(value))
        .refine((value) => !isNaN(value), {
          message: "o id precisa ser um número!",
        })
        .parse(request.params.id);

      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { TablesSessionsController };
