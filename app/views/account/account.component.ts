import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';
import { localStorage } from '~/main';
import { TextField } from 'ui/text-field';
import { FirebaseAPIService } from '~/services/firebase-api/firebase-api.service';

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
        private userDataService: UserDataService,
        private _ngFire: FirebaseAPIService
    ) {
        if (userDataService.isUserData) {
            this.userData = userDataService.user;
        }
        this.userData = userDataService.user;
    }

    isValidated(): boolean {
        if (!this.userData.firstName) {
            dialogs.alert({ message: 'Please enter a valid first name.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.middleName) {
            dialogs.alert({ message: 'Please enter a valid middle name.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.lastName) {
            dialogs.alert({ message: 'Please enter a valid last name.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.contactNo) {
            dialogs.alert({ message: 'Please enter a valid contact number.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.password) {
            dialogs.alert({ message: 'Please enter a valid password.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.confirmPassword) {
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

    async updateAccountData() {
        if (this.userData.password == this.userData.confirmPassword) {
            this.userDataService.updateUserData(this.userData);
            let updateResponse = await this._ngFire.updateUserData(this.userData);
            dialogs.alert({ message: updateResponse.message, okButtonText: 'OK' })
            console.dir(updateResponse);
        } else {
            dialogs.alert({ message: "The passwords does not match!", okButtonText: 'OK' })
        }
    }

    onEditButton(textField: TextField) {
        textField.editable = !textField.editable;
    }

    trackByIndex(index: number, obj: any): any {
        return index;
    }
}