import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';
import { localStorage } from '~/main';
import { Seller } from '~/models/seller-data';
import * as firebase from "nativescript-plugin-firebase";

@Component({
    selector: "homePage",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    userData: UserData = new UserData();
    sellerData: Seller = new Seller();

    constructor(
        private navigationService: NavigationService,
        private userDataService: UserDataService
    ) {
        if (userDataService.isUserData) {
            this.userData = userDataService.user;
        }
        this.sellerData.sellerEmail = "food-outlet-test@gmail.com";
        this.sellerData.sellerPassword = "12345678";
        // this.userData.fullName = "Juan Dela Cruz";
        // this.userData.idNumber = "20141000000";
        // this.userData.contactNumbers = "+639123456789";
        // this.userData.deliveryAddress = "Bldg 42-6/F PAT Bldg";
        // userDataService.updateUserData(this.userData);
    }

    isUserValidated(): boolean {
        if (!this.userData.fullName) {
            dialogs.alert({ message: 'Please enter a valid name.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.idNumber) {
            dialogs.alert({ message: 'Please enter a valid ID number.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.contactNumbers) {
            dialogs.alert({ message: 'Please enter a valid contact number.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.deliveryAddress) {
            dialogs.alert({ message: 'Please enter a valid delivery address.', okButtonText: 'OK' });
            return false;
        }
        return true;
    }

    async saveUserData() {
        if (this.isUserValidated()) {
            this.userDataService.updateUserData(this.userData);
            await dialogs.confirm({ message: 'User Data Saved.', okButtonText: 'OK' });
        }
    }

    proceedToOrderPage() {
        if (this.isUserValidated()) {
            this.navigationService.navigateToOrderPage();
        }
    }

    isSellerValidated(): boolean {
        if (!this.sellerData.sellerEmail) {
            dialogs.alert({ message: 'Please enter a valid email.', okButtonText: 'OK' });
            return false;
        }
        if (!this.sellerData.sellerPassword) {
            dialogs.alert({ message: 'Please enter a password.', okButtonText: 'OK' });
            return false;
        }
        return true;
    }

    sellerLogin() {
        if (this.isSellerValidated()) {
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.sellerData.sellerEmail,
                        password: this.sellerData.sellerPassword
                    }
                })
                .then(result => {
                    // JSON.stringify(result);
                    // console.dir(result);
                    let isAuthenticated = dialogs.alert({ message: 'Authentication Successful', okButtonText: 'OK' });
                    if(isAuthenticated) {
                        this.navigationService.navigateToFoodOutletPage();
                    }
                })
                .catch(error => {
                    let errorMessage = error.split(": ");
                    console.log(errorMessage[1]);
                    dialogs.alert({ message: errorMessage[1], okButtonText: 'OK' });
                });
        }
    }
}