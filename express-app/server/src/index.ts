import ProductController from "./controllers/ProductController";
import App from "./App";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";
import ProductService from "./services/ProductService";
import OrderController from "./controllers/OrderController";
import OrderService from "./services/OrderService";

const { PORT } = process.env;
console.log(PORT);
const server = new App(
    Number(5000),
    [new UserController(UserService),
    new ProductController(ProductService),
    new OrderController(OrderService)]
);
server.listen();