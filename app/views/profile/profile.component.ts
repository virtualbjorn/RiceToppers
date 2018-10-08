import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';
import { localStorage } from '~/main';

@Component({
    selector: "profilePage",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent {
    userData: UserData = new UserData();

    constructor(
        private navigationService: NavigationService,
        private userDataService: UserDataService
    ) {
        if (userDataService.isUserData) {
            this.userData = userDataService.user;
        }
    }

    isValidated(): boolean {
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
        if (this.isValidated()) {
            this.userDataService.updateUserData(this.userData);
            await dialogs.confirm({ message: 'User Data Saved.', okButtonText: 'OK' });
        }
    }

    proceedToOrderPage() {
        if (this.isValidated()) {
            this.navigationService.navigateToOrderPage();
        }
    }
}