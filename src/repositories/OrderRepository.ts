import { QueryResult } from "pg";
import query from "../config/db";
import { OrderModel } from "../models/OrderModel";

class OrderRepository {
	async create<T>(order: Array<T>) {
		const res = await query(
			"INSERT INTO orders(iduser, order_date,order_total) VALUES ($1,$2,$3) returning *",
			order
		);
		return res;
	}

	async findOrderById(iduser: number): Promise<QueryResult<OrderModel>> {
		const res = await query("select * from orders where iduser = $1", [iduser]);
		return res;
	}
}

const orderRepository = new OrderRepository();

export default orderRepository;
