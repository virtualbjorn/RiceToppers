export class OrderData {
    productName: string;
    productPrice: number;
    piecesToOrder: number;
    totalPrice: number;
    foodItemIndex: number[]

    // constructor(productName: string, productPrice: number, piecesToOrder: number, totalPrice: number) {
    //     this.productName = productName;
    //     this.productPrice = productPrice;
    //     this.piecesToOrder = piecesToOrder;
    //     this.totalPrice = totalPrice;
    // }
}

export class OrderHistory {
    customerRef: any;
    orderStatus: string;
    orderData: OrderData[];
    orderType: string;
    userData: {
        contactNo: string,
        name: string,
        deliveryAddress: string
    }
    id: string;
    timecreated: any;
    totalAmountPayable: number;
}