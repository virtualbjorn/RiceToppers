import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data';
import { localStorage } from '~/main';
import { FirebaseAPIService } from '../firebase-api/firebase-api.service';
import * as dialogs from 'ui/dialogs';

@Injectable()
export class UserDataService {
    private userData: UserData;

    updateUserData(userData: UserData) {
        this.userData = userData;
        localStorage.setItemObject('User Data', this.userData);
    }

    get isUserData(): boolean {
        return localStorage.getItem('User Data') ? true : false;
    }

    async userDetails(): Promise<any> {
        let deliveryAddress = await this.setDeliveryAddress();
        return {
            name: `${this.userData.firstName} ${this.userData.lastName}`,
            contactNo: this.userData.contactNo,
            deliveryAddress: deliveryAddress
        };
        // return `Customer Details\nName: ${this.userData.firstName} ${this.userData.lastName}\nContact Number: ${this.userData.contactNo}\nDelivery Address: ${deliveryAddress}`;
    }

    async setDeliveryAddress(): Promise<string> {
        let confirmOptions: dialogs.ConfirmOptions = {
            title: "Delivery Address",
            message: "Do you want to add a new delivery address?",
            okButtonText: "Yes",
            cancelButtonText: "No"
        }
        let confirmResponse = await dialogs.confirm(confirmOptions);
        if (confirmResponse) {
            let promptOptions: dialogs.PromptOptions = {
                title: "Delivery Address",
                message: "Enter your new delivery address.",
                okButtonText: "OK",
                cancelButtonText: "Cancel",
                cancelable: true,
                inputType: dialogs.inputType.text
            }
            let promptResponse = await dialogs.prompt(promptOptions);
            if (promptResponse.result) {
                return await promptResponse.text;
            } else {
                return;
            }
        } else {
            let actionOptions: dialogs.ActionOptions = {
                title: "Race selection",
                message: "Choose your race",
                cancelButtonText: "Cancel",
                actions: this.user.address
            }
            let actionResponse = await dialogs.action(actionOptions);
            if (actionResponse) {
                return await actionResponse;
            } else {
                return;
            }
        }
    }



    get user(): UserData {
        this.userData = localStorage.getItem('User Data');
        return this.userData;
    }
}