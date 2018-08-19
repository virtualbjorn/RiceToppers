import { OrderData } from "./order-data";

export class OrderCart {
    totalAmountPayable: number;
    orderData: Array<OrderData>;

    constructor() {
        this.totalAmountPayable = 0;
        this.orderData = new Array<OrderData>();
    }
}