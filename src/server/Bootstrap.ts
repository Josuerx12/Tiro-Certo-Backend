import "express-async-errors";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { DBConnect } from "../config/DB";
import { routesRouter } from "./router";
import { ErrorHandler } from "../middlewares/error-handler";

export class Bootstrap {
  private app: express.Express;
  private port: number;

  constructor() {
    config();
    this.app = express();
    this.port = Number(process.env.PORT) || 8080;

    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(ErrorHandler);
    this.app.use(routesRouter);
  }

  start = async () => {
    await DBConnect()
      .then(() =>
        this.app.listen(this.port, () =>
          console.log("Servidor rodando em: " + `http://localhost:${this.port}`)
        )
      )
      .catch((err) => console.log(err.message));
  };
}
