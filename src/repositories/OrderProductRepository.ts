import query from "../config/db";
import { OrderProductModel } from "../models/OrderProductModel";

class OrderProductRepository {
	async create<T>(orderProduct: Array<T>) {
		return await query(
			"insert into orders_products(idorder,idproduct,quantity) values ($1,$2,$3)",
			orderProduct
		);
	}

	async findProductInOrder(orderProduct: OrderProductModel) {
		const { idorder, idproduct } = orderProduct;
		return await query(
			"select * from orders_products where idorder = $1 and idproduct = $2",
			[idorder, idproduct]
		);
	}

	async updateQuantity(orderProduct: OrderProductModel) {
		const { idorder, idproduct, quantity } = orderProduct;
		return await query(
			"UPDATE orders_products SET quantity = $1 where idorder = $2 and idproduct = $3 ",
			[quantity, idorder, idproduct]
		);
	}

	async removeProductInOrder(idproduct: number, idorder: number) {
		return await query(
			"delete from orders_products where idorder = $1 and idproduct = $2",
			[idorder, idproduct]
		);
	}

	async findAllProductsInOrder(idorder: number) {
		const res = await query(
			"select op.idorder, op.quantity, prd.name, prd.image, prd.price from orders_products op left outer join products prd on op.idproduct = prd.idproduct where idorder = $1",
			[idorder]
		);

		return res;
	}
}

const orderProductRepository = new OrderProductRepository();

export default orderProductRepository;
