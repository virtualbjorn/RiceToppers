import { Injectable } from '@angular/core';
import { OrderCart } from '../../models/order-cart';
import { OrderData } from '../../models/order-data';

@Injectable()
export class OrderDataService {
    orderCart: OrderCart = new OrderCart();
    orderData: Array<OrderData> = new Array<OrderData>();
    productData: Array<OrderData> = new Array<OrderData>();

    constructor() {
        this.setProductData();
    }

    addOrder(orderDetails: OrderData) {
        let totalAmountPayable = 0;
        let isInCart = this.orderData.find((orderDetail) => {
            if (orderDetail.productName == orderDetails.productName) {
                orderDetail = orderDetails;
                return true;
            }
        });
        if (!isInCart) {
            this.orderData.push(orderDetails);
        }
        this.orderData.map((orderDetail) => {
            totalAmountPayable += orderDetail.totalPrice;
        });
        this.orderCart.totalAmountPayable = totalAmountPayable;
        this.orderCart.orderData = this.orderData;
        // console.dir(this.orderCart);
    }

    getProductData(productName: string): OrderData {
        let productDetailData: any;
        this.productData.find((productDetail) => {
            if (productName == productDetail.productName) {
                productDetailData = productDetail;
                return true;
            }
        });
        return productDetailData;
    }

    get cartData(): OrderCart {
        return this.orderCart;
    }

    resetOrders() {
        this.orderCart = new OrderCart();
        this.orderData = new Array<OrderData>();
        this.setProductData();
    }

    get orderDetails(): string {
        let orderList: string = 'Order Details:';
        this.orderCart.orderData.map((order) => {
            orderList = orderList.concat('\n', `${order.piecesToOrder + (order.piecesToOrder > 1 ? 'pcs' : 'pc')} of ${order.productName} = Php ${order.totalPrice}.00`);
        });
        orderList = orderList.concat('\n\n', `Total Amount Payable: Php ${this.orderCart.totalAmountPayable}.00`)
        return orderList;
    }

    setProductData() {
        this.productData = new Array<OrderData>();
        this.productData.push(new OrderData('Product 1', 25, 0, 0));
        this.productData.push(new OrderData('Product 2', 26, 0, 0));
        this.productData.push(new OrderData('Product 3', 27, 0, 0));
        this.productData.push(new OrderData('Product 4', 28, 0, 0));
    }
}