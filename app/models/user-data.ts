export class UserData {
    fullName: string;
    idNumber: string;
    // contactNumbers: Array<string>;
    contactNumbers: string;
    deliveryAddress: string;

    constructor() {
        this.fullName = "";
        this.idNumber = "";
        // this.contactNumbers = [];
        this.contactNumbers = "";
        this.deliveryAddress = "";
    }
}