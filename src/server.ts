import express from "express";
import { routes } from "./routes";

const PORT = 3333; // porta padrão 
const app = express(); // cria o servidor

app.use(express.json()); // permite que o servidor entenda JSON
app.use(routes); // usa as rotas definidas

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); // inicia o servidor na porta definida
