import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

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
}

export { ProductController };
