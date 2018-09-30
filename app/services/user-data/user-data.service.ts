import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data';

@Injectable()
export class UserDataService {
    userData: UserData;

    updateUserData(userData: UserData) {
        this.userData = new UserData();
        this.userData = userData;
    }

    get userDetails(): string {
        return `Customer Details\nName: ${this.userData.fullName}\nContact Number: ${this.userData.contactNumbers}\nDelivery Address: ${this.userData.deliveryAddress}`;
    }

    get user(): UserData {
        return this.userData;
    }
}