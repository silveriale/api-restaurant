import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { knex } from "@/database/knex"; // Importa o knex para interagir com o banco de dados
import { z } from "zod";

class OrdersController {
  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        // define o schema de validação do corpo da requisição
        table_session_id: z.number(), // id da sessão da mesa
        product_id: z.number(), // id do produto
        quantity: z.number(), // quantidade do produto
      });

      const { table_session_id, product_id, quantity } = bodySchema.parse(
        request.body
      ); // valida o corpo da requisição e extrai os dados

      const session = await knex<TablesSessionsRepository>("tables_sessions") // verifica se a sessão da mesa existe e está aberta
        .where({ id: table_session_id }) // filtra pela id da sessão da mesa
        .first(); // pega a primeira sessão que encontrar

      if (!session) {
        throw new AppError("A sessão de mesa não existe.");
      } // se a sessão da mesa não existir, lança um erro

      if (session.closed_at) {
        throw new AppError("A sessão de mesa já foi fechada.");
      } // se a sessão da mesa estiver fechada, lança um erro

      const product = await knex<ProductRepository>("products") // verifica se o produto existe
        .where({ id: product_id }) // filtra pela id do produto
        .first(); // pega o primeiro produto que encontrar

      if (!product) {
        throw new AppError("O produto não existe.");
      } // se o produto não existir, lança um erro

      await knex<OrderRepository>("orders").insert({
        table_session_id,
        product_id,
        quantity,
        price: product.price,
      });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async index(request: Request, response: Response, next: NextFunction) {
    try {
      return response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { OrdersController };
