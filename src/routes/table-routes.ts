import { Router } from "express";

import { TablesController } from "@/controllers/tables-controller";

const tablesRoutes = Router(); // define a rota para mesas
const tablesController = new TablesController(); // instancia o controlador de mesas

tablesRoutes.get("/", tablesController.index); // define a rota GET para listar mesas usando o método index do controlador

export { tablesRoutes };
