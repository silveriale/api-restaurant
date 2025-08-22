import { Router } from "express"; // importa o o Router do express
import { OrdersController } from "@/controllers/orders-controller";

const ordersRoutes = Router(); // cria uma nova instância do rota
const ordersController = new OrdersController(); // cria uma nova instância do controlador

ordersRoutes.post("/", ordersController.create); // define a rota POST / e associa ao método create do controlador
ordersRoutes.get("/table-session/:table_session_id", ordersController.index); // define a rota GET /table-session/:table_session_id e associa ao método index do controlador
ordersRoutes.get(
  "/table-session/:table_session_id/total",
  ordersController.show
); // define a rota GET /table-session/:id/total e associa ao método show do controlador

export { ordersRoutes };
