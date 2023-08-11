import { OrderModel } from "../models/OrderModel";
import { OrderProductModel } from "../models/OrderProductModel";
import { ProductModel } from "../models/ProductModel";
import orderProductRepository from "../repositories/OrderProductRepository";
import orderRepository from "../repositories/OrderRepository";
import productRepository from "../repositories/ProductRepository";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";
import orderService from "./OrderService";

class OrderProductService {
	async insertProductInOrder(orderProduct: OrderProductModel, iduser: number) {
		const { idproduct, quantity } = orderProduct;
		const productExists = await productRepository.findProductById(idproduct);

		if (!productExists) {
			throw new ResponseError(HttpStatus.NOT_FOUND, "Product not found.");
		}

		const order = await orderService.verifyIfExistsOrder(iduser);

		if (order.rows.length === 0) {
			const res = await orderService.create(iduser);
			return await orderProductRepository.create([
				res.rows[0].idorder,
				idproduct,
				quantity,
			]);
		}

		const productExistsInOrder =
			await orderProductRepository.findProductInOrder({
				idorder: order.rows[0].idorder,
				idproduct,
			});

		if (productExistsInOrder.rows.length > 0) {
			return await orderProductRepository.updateQuantity({
				idorder: order.rows[0].idorder,
				idproduct,
				quantity: (productExistsInOrder.rows[0].quantity += quantity),
			});
		}

		return await orderProductRepository.create([
			order.rows[0].idorder,
			idproduct,
			quantity,
		]);
	}

	async removeProductInOrder(idproduct: number, iduser: number) {
		const order = await orderRepository.findOrderById(iduser);

		if (order.rows.length === 0) {
			throw new ResponseError(
				HttpStatus.NOT_FOUND,
				"You don't select any products"
			);
		}

		const idorder = order.rows[0].idorder;

		return await orderProductRepository.removeProductInOrder(
			idproduct,
			idorder
		);
	}

	async findAllProductsInOrder(iduser: number) {
		const order = await orderRepository.findOrderById(iduser);

		if (order.rows.length === 0) {
			throw new ResponseError(
				HttpStatus.NOT_FOUND,
				"You don't select any products"
			);
		}

		const idorder = order.rows[0].idorder;
		const ordersProducts = await orderProductRepository.findAllProductsInOrder(
			idorder
		);
		return ordersProducts.rows;
	}
}

const orderProductService = new OrderProductService();

export default orderProductService;
