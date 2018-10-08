import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data';
import { localStorage } from '~/main';

@Injectable()
export class UserDataService {
    private userData: UserData;

    updateUserData(userData: UserData) {
        this.userData = userData;
        console.dir(this.userData);
        localStorage.setItemObject('User Data', this.userData);
    }

    get isUserData(): boolean {
        return localStorage.getItem('User Data') ? true : false;
    }

    get userDetails(): string {
        return `Customer Details\nName: ${this.userData.fullName}\nContact Number: ${this.userData.contactNumbers}\nDelivery Address: ${this.userData.deliveryAddress}`;
    }

    get user(): UserData {
        this.userData = localStorage.getItem('User Data');
        return this.userData;
    }
}