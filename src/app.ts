import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./controllers/UserController";
import authRouter from "./controllers/AuthController";
import productRouter from "./controllers/ProductController";
import orderProductRouter from "./controllers/OrderProductController";

const app = express();

app.use(morgan("tiny"));

app.use(cors());

app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/orderProduct", orderProductRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(500).send(error.message);
});

export default app;
