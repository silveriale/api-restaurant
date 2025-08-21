import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  // middleware para tratamento de erros
  if (error instanceof AppError) {
    // verifica se o erro é uma instância de AppError
    return response.status(error.statusCode).json({
      // retorna o erro com o código de status e mensagem
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    // verifica se o erro é uma instância de ZodError
    return response.status(400).json({
      // retorna erro de validação
      message: "Validation error", // mensagem de erro
      issues: error.format(), // formata os erros de validação
    });
  }

  return response.status(500).json({ message: error.message }); // retorna erro genérico para outros tipos de erro
}
