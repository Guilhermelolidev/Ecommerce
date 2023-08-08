export class OrderModel {
	idorder: number;
	iduser: number;
	order_date: Date;
	order_total: number;

	constructor(order: OrderModel) {
		this.idorder = order.idorder;
		this.iduser = order.iduser;
		this.order_date = order.order_date;
		this.order_total = order.order_total;
	}
}
