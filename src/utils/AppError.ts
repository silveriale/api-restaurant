class AppError {
  // classe para erros personalizados
  message: string; // mensagem de erro
  statusCode: number; // código de status HTTP
  constructor(message: string, statusCode: number = 400) {
    // construtor com mensagem e código de status padrão 400
    this.message = message; // atribui a mensagem
    this.statusCode = statusCode; // atribui o código de status
  }
}

export { AppError };
