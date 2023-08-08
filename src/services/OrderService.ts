import { QueryResult } from "pg";
import { OrderModel } from "../models/OrderModel";
import orderRepository from "../repositories/OrderRepository";

class OrderService {
	async create(iduser: number) {
		const order_date = new Date();
		const order_total = 0;

		const orderData = [iduser, order_date, order_total];

		const res = await orderRepository.create(orderData);
		return res;
	}

	async verifyIfExistsOrder(iduser: number): Promise<QueryResult> {
		const existsOrder = await orderRepository.findOrderById(iduser);

		return existsOrder;
	}
}

const orderService = new OrderService();

export default orderService;
