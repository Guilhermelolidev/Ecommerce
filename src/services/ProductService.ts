import { ProductModel } from "../models/ProductModel";
import productRepository from "../repositories/ProductRepository";
import { PaginationQueryParams } from "../types/pagination";
import { HttpStatus } from "../utils/enums";
import ResponseError from "../utils/exceptions";

class ProductService {
	async index(pagination: PaginationQueryParams) {
		const page = pagination.page || 1;
		const limit = pagination.limit || 10;
		const salt = (page - 1) * limit;

		const paginationData = {
			limit,
			offset: salt,
		};
		const products = await productRepository.index(paginationData);
		return products;
	}

	async create(product: ProductModel) {
		const { name, image, price } = product;

		if (!name || !image || !price) {
			throw new ResponseError(
				HttpStatus.MULTIPLE_CHOICES,
				"Some parameters were not given."
			);
		}

		const productData = [name, image, price];

		await productRepository.create(productData);
	}
}

const productService = new ProductService();

export default productService;
