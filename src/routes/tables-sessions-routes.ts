import { Router } from "express";
import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router(); // cria uma instância do Router
const tablesSessionsController = new TablesSessionsController(); // cria uma instância do controlador

tablesSessionsRoutes.get("/", tablesSessionsController.index); // define a rota GET para listar sessões de mesa, usando o método index do controlador
tablesSessionsRoutes.post("/", tablesSessionsController.create); // define a rota POST para criar uma sessão de mesa, usando o método create do controlador
tablesSessionsRoutes.patch("/:id", tablesSessionsController.update); // define a rota PATCH para atualizar uma sessão de mesa, usando o método update do controlador

export { tablesSessionsRoutes };
