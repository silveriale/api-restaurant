import { Router } from "express"; // importa o o Router do express
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router(); // cria uma nova instância do rota
const ordersController = new OrdersController(); // cria uma nova instância do controlador

ordersRoutes.post("/", ordersController.create); // define a rota POST / e associa ao método create do controlador

export { ordersRoutes };
