import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import userController from "./controllers/userController"
import categoryController from "./controllers/categoryController"
import productController from "./controllers/productController"
import cartProductController from "./controllers/cartProductController"
import orderController from "./controllers/orderController"

mongoose.connect(
  "db"
);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3006"],
  })
);
app.use(bodyParser.json());

app.use("/", userController)
app.use("/", categoryController)
app.use("/", productController)
app.use("/", cartProductController)
app.use("/", orderController)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});