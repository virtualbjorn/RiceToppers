import { Injectable } from '@angular/core';
import { OrderCart } from '../../models/order-cart';
import { OrderData, OrderHistory } from '../../models/order-data';

@Injectable()
export class OrderDataService {
    orderCart: OrderCart = new OrderCart();
    orderData: Array<OrderData> = new Array<OrderData>();
    orderHistory: Array<OrderHistory> = new Array<OrderHistory>();
    
    addOrder(orderDetails: OrderData) {
        let totalAmountPayable = 0;
        let isInOrderList = this.orderData.find((orderDetail) => {
            if (orderDetail.productName == orderDetails.productName) {
                orderDetail.piecesToOrder += orderDetails.piecesToOrder;
                orderDetail.totalPrice = orderDetail.piecesToOrder * 50;
                return true;
            }
        });
        if (!isInOrderList) {
            this.orderData.push(orderDetails);
        }
        this.orderData.map((orderDetail) => {
            totalAmountPayable += orderDetail.totalPrice;
        });
        this.orderCart.totalAmountPayable = totalAmountPayable;
        this.orderCart.orderData = this.orderData;
    }

    get cartData(): OrderCart {
        return this.orderCart;
    }

    resetOrders() {
        this.orderCart = new OrderCart();
        this.orderData = new Array<OrderData>();
    }

    get orderDetails(): string {
        let orderList: string = 'Order Details:';
        this.orderCart.orderData.map((order) => {
            orderList = orderList.concat('\n', `${order.piecesToOrder + (order.piecesToOrder > 1 ? 'pcs' : 'pc')} of ${order.productName} = Php ${order.totalPrice.toFixed(2)}`);
        });
        orderList = orderList.concat('\n\n', `Total Amount Payable: Php ${this.orderCart.totalAmountPayable.toFixed(2)}`)
        return orderList;
    }
}