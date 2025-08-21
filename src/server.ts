import express from "express";
import { routes } from "./routes";
import { errorHandling } from "./middlewares/error-handling";

const PORT = 3333; // porta padrão
const app = express(); // cria o servidor

app.use(express.json()); // permite que o servidor entenda JSON
app.use(routes); // usa as rotas definidas

app.use(errorHandling); // usa o middleware de tratamento de erros

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // inicia o servidor na porta definida
