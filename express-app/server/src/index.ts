import ProductController from "./controllers/ProductController";
import App from "./App";
import UserController from "./controllers/UserController";
import UserService from "./services/UserService";
import ProductService from "./services/ProductService";

const { PORT } = process.env;
const server = new App(
    Number(PORT),
    [new UserController(UserService),
    new ProductController(ProductService)]
);
server.listen();