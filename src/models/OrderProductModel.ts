export class OrderProductModel {
	idorder: number;
	idproduct: number;
	quantity?: number;

	constructor(orderProduct: OrderProductModel) {
		this.idorder = orderProduct.idorder;
		this.idproduct = orderProduct.idproduct;
		this.quantity = orderProduct.quantity;
	}
}
