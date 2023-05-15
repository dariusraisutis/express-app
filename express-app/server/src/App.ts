import express, { Application } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import { IController } from "./interfaces/IController";

class App {
  private app: Application;
  private readonly port: number;

  constructor(port: number, controllers: IController[]) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewear();
    this.initializeDatabase();
    this.initialiseControllers(controllers);
  }

  private initializeMiddlewear(): void {
    // Middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use(helmet());
    this.app.use(cors());
  }

  private initializeDatabase(): void {
    const { MONGO_PATH } = process.env;
    mongoose
      .connect(MONGO_PATH)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB:", err);
      });
  }

  private initialiseControllers(controllers: IController[]): void {
    controllers.forEach((controller: IController) => {
        this.app.use('/api', controller.router);
    });
}

  public listen(): void {
    const { port } = this;
    this.app.listen(port, () => {
      console.log(`Server running on port ${ port }`);
    });
  }
}

export default App;