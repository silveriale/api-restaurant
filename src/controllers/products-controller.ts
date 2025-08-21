import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
  // controlador de produtos
  async index(request: Request, response: Response, next: NextFunction) {
    // método para listar produtos
    try {
      // lógica para listar produtos
      response.json({ message: "ok" }); // retorna resposta JSON com mensagem de sucesso
    } catch (error) {
      // captura erros
      next(error); // passa o erro para o middleware de tratamento de erros
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    // método para criar um novo produto
    try {
      // lógica para criar um novo produto
      const bodySchema = z.object({
        name: z.string().trim().min(6), // validação do nome do produto, deve ser uma string com no mínimo 6 caracteres e sem espaços em branco
        price: z.number().gt(0), // validação do preço do produto, deve ser um número maior que zero
      });

      const { name, price } = bodySchema.parse(request.body); // valida e extrai os dados do corpo da requisição

      await knex<ProductRepository>("products").insert({ name, price }); // insere o novo produto no banco de dados, importando o tipo ProductRepository para garantir a estrutura correta

      return response.status(201).json(); // retorna resposta JSON com o produto criado
    } catch (error) {
      // captura erros
      next(error); // passa o erro para o middleware de tratamento de erros
    }
  }
}

export { ProductController };
