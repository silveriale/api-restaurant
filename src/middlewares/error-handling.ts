import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

export function errorHandling(error: any, request: Request, response: Response, _: NextFunction) { // middleware para tratamento de erros
  if (error instanceof AppError) { // verifica se o erro é uma instância de AppError
    return response.status(error.statusCode).json({ // retorna o erro com o código de status e mensagem
      message: error.message,
    });
  }

  return response.status(500).json({ // retorna erro genérico para outros tipos de erro
    message: error.message,
  });
    
}