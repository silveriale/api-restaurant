import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router(); // define a rota para produtos
const productController = new ProductController(); // instancia o controlador de produtos

productsRoutes.get("/", productController.index); // define a rota GET para listar produtos usando o método index do controlador

export { productsRoutes };
