import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { z } from "zod";

class ProductController {
  // controlador de produtos
  async index(request: Request, response: Response, next: NextFunction) {
    // método para listar produtos
    try {
      // lógica para listar produtos
      const { name } = request.query; // extrai o parâmetro de consulta 'name' da requisição
      const products = await knex<ProductRepository>("products")
        .select() //seleciona todos os produtos da tabela "products", importando o tipo ProductRepository para garantir a estrutura correta e
        .whereLike("name", `%${name ?? ""}%`) // filtra os produtos pelo nome, se o parâmetro 'name' for fornecido, caso contrário, retorna todos os produtos
        .orderBy("name"); // ordena por nome em ordem alfabética

      response.json(products); // retorna resposta JSON com os produtos
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

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string() // define o tipo do parâmetro 'id' como string
        .transform((value) => Number(value)) // transforma o parâmetro 'id' em número
        .refine((value) => !isNaN(value), {
          // valida se o valor é um número
          message: "o ID deve ser um número", // mensagem de erro personalizada caso a validação falhe
        })
        .parse(request.params.id); // valida e transforma o parâmetro 'id' da rota em um número

      const bodySchema = z.object({
        name: z.string().trim().min(6), // validação do nome do produto, deve ser uma string com no mínimo 6 caracteres e sem espaços em branco
        price: z.number().gt(0), // validação do preço do produto, deve ser um número maior que zero
      });

      const { name, price } = bodySchema.parse(request.body); // valida e extrai os dados do corpo da requisição

      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() }) // atualiza o produto no banco de dados, importando o tipo ProductRepository para garantir a estrutura correta, e atualiza o campo 'updated_at' com a data e hora atual
        .where({ id }); // filtra o produto pelo ID fornecido

      return response.json(); // retorna resposta JSON indicando que a atualização foi bem-sucedida
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
