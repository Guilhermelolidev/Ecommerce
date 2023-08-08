export class ProductModel {
	id?: string;
	name: string;
	image: string;
	price: number;

	constructor(product: ProductModel) {
		this.name = product.name;
		this.image = product.image;
		this.price = product.price;
	}
}
