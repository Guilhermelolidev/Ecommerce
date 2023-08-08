import query from "../config/db";
import { ProductModel } from "../models/ProductModel";
import { PaginationQuery } from "../types/pagination";

class ProductRepository {
	async index(pagination: PaginationQuery) {
		const { limit, offset } = pagination;
		const response = await query("select * from products limit $1 offset $2", [
			limit,
			offset,
		]);
		return response.rows;
	}

	async create(product: Array<string | number>) {
		return await query(
			"insert into products(name, image,price) values ($1, $2,$3)",
			product
		);
	}

	async findProductById(idproduct: number): Promise<ProductModel> {
		const product = await query("select * from products where idproduct = $1", [
			idproduct,
		]);
		return product.rows[0];
	}
}

const productRepository = new ProductRepository();

export default productRepository;
