import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';
import { localStorage } from '~/main';
import { TextField } from 'ui/text-field';

@Component({
    selector: "app-account",
    moduleId: module.id,
    templateUrl: "./account.component.html",
    styleUrls: ["../account-and-signup.scss"]
})
export class AccountComponent {
    userData: UserData = new UserData();
    isLoggedIn: boolean = true;
    isEditableTextField: boolean = false;
    editButton: string = String.fromCharCode(0xf304);;

    constructor(
        private navigationService: NavigationService,
        private userDataService: UserDataService
    ) {
        if (userDataService.isUserData) {
            this.userData = userDataService.user;
        }
        this.userData = userDataService.user;
        // this.userData.accountType = this.isLoggedIn ? "Customer" : "Food Provider";
        // this.userData.email = "virtual.bjorn@gmail.com";
        // this.userData.fullName = "Bryan Jim Paano";
        // this.userData.contactNumber = "+639123456789";
        // this.userData.password = "12345678";
        // this.userData.confirmPassword = "12345678";
        // this.userData.deliveryAddress = "Bldg 42-6/F PAT Bldg";
        // userDataService.updateUserData(this.userData);
    }

    isValidated(): boolean {
        if (!this.userData.fullName) {
            dialogs.alert({ message: 'Please enter a valid name.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.contactNumber) {
            dialogs.alert({ message: 'Please enter a valid contact number.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.password) {
            dialogs.alert({ message: 'Please enter a valid password.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.confirmPassword) {
            dialogs.alert({ message: 'Please re-enter your password.', okButtonText: 'OK' });
            return false;
        }
        return true;
    }

    async saveUserData() {
        if (this.isValidated()) {
            this.userDataService.updateUserData(this.userData);
            await dialogs.confirm({ message: 'User Data Saved.', okButtonText: 'OK' });
        }
    }

    proceedToOrderList() {
        if (this.isValidated()) {
            this.navigationService.navigateToOrderList();
        }
    }

    onEditButton(textField: TextField) {
        textField.editable = !textField.editable;
    }
}