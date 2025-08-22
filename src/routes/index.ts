import { Router } from "express";

import { tablesSessionsRoutes } from "./tables-sessions-routes";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./table-routes";
import { ordersRoutes } from "./orders-routes";

const routes = Router(); // define as rotas principais
routes.use("/tables-sessions", tablesSessionsRoutes); // usa as rotas de sessões de mesas
routes.use("/products", productsRoutes); // usa as rotas de produtos
routes.use("/tables", tablesRoutes); // usa as rotas de mesas
routes.use("/orders", ordersRoutes); // usa as rotas de pedidos

export { routes };
