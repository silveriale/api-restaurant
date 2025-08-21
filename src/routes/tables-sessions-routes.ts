import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router(); // cria uma instância do Router
const tablesSessionsController = new TablesSessionsController(); // cria uma instância do controlador

tablesSessionsRoutes.post("/", tablesSessionsController.create); // define a rota POST para criar uma sessão de mesa, usando o método create do controlador

export { tablesSessionsRoutes };
