import { Router } from "express";
import { productsRoutes } from "./products-routes";

const routes = Router(); // define as rotas principais
routes.use("/products", productsRoutes); // usa as rotas de produtos

export { routes };