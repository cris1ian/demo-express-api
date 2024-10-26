import express, { Application, Router } from "express";
import { ProductController } from './controller/product.controller'
import { loggerMiddleware } from "./middleware/logger.middleware";

const app: Application = express();
const router: Router = Router();

app.use(express.json());
app.use(loggerMiddleware);

/** Controllers List */
new ProductController(router, app);

/** Generiec error handling */
app.use((err: Error, req: any, res: any) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong' })
})

export default app;
