import { Router } from "express";

import { tablesSessionsRoutes } from "./tables-sessions-routes";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./table-routes";

const routes = Router(); // define as rotas principais
routes.use("/tables-sessions", tablesSessionsRoutes); // usa as rotas de sessões de mesas
routes.use("/products", productsRoutes); // usa as rotas de produtos
routes.use("/tables", tablesRoutes); // usa as rotas de mesas

export { routes };
