import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./table-routes";

const routes = Router(); // define as rotas principais
routes.use("/products", productsRoutes); // usa as rotas de produtos
routes.use("/tables", tablesRoutes); // usa as rotas de mesas

export { routes };
