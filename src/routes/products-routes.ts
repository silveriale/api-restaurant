import { Router } from "express";
import { ProductController } from "@/controllers/products-controller";

const productsRoutes = Router(); // define a rota para produtos
const productController = new ProductController(); // instancia o controlador de produtos

productsRoutes.get("/", productController.index); // define a rota GET para listar produtos usando o método index do controlador
productsRoutes.post("/", productController.create); // define a rota POST para criar um novo produto usando o método create do controlador
productsRoutes.put("/:id", productController.update); // define a rota PUT para atualizar um produto específico usando o método update do controlador
productsRoutes.delete("/:id", productController.remove); // define a rota DELETE para remover um produto específico usando o método remove do controlador

export { productsRoutes };
