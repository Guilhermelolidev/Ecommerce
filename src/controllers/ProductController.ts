import { Router } from "express";
import { isAdminRoute } from "../middlewares/permissions";
import { requiresAuth } from "../middlewares/requiresAuth";
import productService from "../services/ProductService";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

const productRouter = Router();

productRouter.get("/", requiresAuth, async (req, res) => {
	try {
		const { page, limit } = req.query;
		const pagination = {
			page: Number(page),
			limit: Number(limit),
		};
		const products = await productService.index(pagination);
		return res.status(HttpStatus.OK).json(products);
	} catch (err) {
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}

		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

productRouter.post("/", requiresAuth, isAdminRoute, async (req, res) => {
	try {
		await productService.create(req.body);
		return res.status(HttpStatus.CREATED).json();
	} catch (err) {
		if (err instanceof ResponseError) {
			return res.status(err.httpStatus).json({ error: err.message });
		}

		const e = err as Error;
		return res
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.json({ error: e.message });
	}
});

export default productRouter;
