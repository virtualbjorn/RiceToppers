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
        this.productData.push(new OrderData('Chicken Fillet', 45, 0, 0));
        this.productData.push(new OrderData('Chicken Cordon Bleu', 45, 0, 0));
        this.productData.push(new OrderData('Pork Kawali', 45, 0, 0));
        this.productData.push(new OrderData('Pork Afritada', 45, 0, 0));
        this.productData.push(new OrderData('Pork Steak', 45, 0, 0));
        this.productData.push(new OrderData('Pork Sisig', 45, 0, 0));
        this.productData.push(new OrderData('Pork Humba', 45, 0, 0));
        this.productData.push(new OrderData('Pork Bico Xpress', 45, 0, 0));
        this.productData.push(new OrderData('Ampalaya', 45, 0, 0));
        this.productData.push(new OrderData('Egg (Fried Sunny Side Up)', 45, 0, 0));
        this.productData.push(new OrderData('Lumpia Shanghai (Pork)', 45, 0, 0));
    }
}