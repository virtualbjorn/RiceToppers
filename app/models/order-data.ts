export class OrderData {
    productName: string;
    productPrice: number;
    piecesToOrder: number;
    totalPrice: number;

    // constructor() {
    //     this.productName = "";
    //     this.productPrice = 0;
    //     this.piecesToOrder = 0;
    // }
    constructor(productName: string, productPrice: number, piecesToOrder: number, totalPrice: number) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.piecesToOrder = piecesToOrder;
        this.totalPrice = totalPrice;
    }
}