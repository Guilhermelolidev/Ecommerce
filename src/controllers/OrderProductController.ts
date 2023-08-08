import { Router } from "express";
import { isUserRoute } from "../middlewares/permissions";
import { requiresAuth } from "../middlewares/requiresAuth";
import orderProductService from "../services/OrderProductService";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

const orderProductRouter = Router();

orderProductRouter.post("/", requiresAuth, isUserRoute, async (req, res) => {
	try {
		const iduser = req.iduser;
		await orderProductService.insertProductInOrder(req.body, Number(iduser));
		return res.status(HttpStatus.OK).json();
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

orderProductRouter.delete(
	"/:idproduct",
	requiresAuth,
	isUserRoute,
	async (req, res) => {
		try {
			const { idproduct } = req.params;
			const iduser = req.iduser;
			await orderProductService.removeProductInOrder(
				Number(idproduct),
				Number(iduser)
			);
			return res
				.status(HttpStatus.OK)
				.json({ success: "Product was removed." });
		} catch (err) {
			if (err instanceof ResponseError) {
				return res.status(err.httpStatus).json({ error: err.message });
			}

			const e = err as Error;
			return res
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: e.message });
		}
	}
);

orderProductRouter.get("/", requiresAuth, isUserRoute, async (req, res) => {
	try {
		const iduser = req.iduser;
		const ordersProducts = await orderProductService.findAllProductsInOrder(
			Number(iduser)
		);
		return res.status(HttpStatus.OK).json(ordersProducts);
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

export default orderProductRouter;
