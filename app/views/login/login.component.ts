import { Component } from "@angular/core";
import { AppComponent } from "~/app.component";
import { NavigationService } from "~/services/navigation/navigation.service";
import * as firebase from 'nativescript-plugin-firebase';
import { UserData } from "~/models/user-data";
import * as dialogs from 'ui/dialogs';
import { UIHelperService } from "~/services/ui-helper/ui-helper.service";
import { UserDataService } from "~/services/user-data/user-data.service";

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isLoading: boolean = false;
    userData: UserData = new UserData();
    constructor(
        public appComponent: AppComponent,
        private _navigationService: NavigationService,
        private _uiHelper: UIHelperService,
        private _userDataService: UserDataService
    ) {
        appComponent.addToNavigationStack('login');
        appComponent.isOnLoginPage = true;
    }

    isValidated(): boolean {
        if (!this.userData.email) {
            dialogs.alert({ message: 'Please enter a valid email address.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.password) {
            dialogs.alert({ message: 'Please enter a valid password.', okButtonText: 'OK' });
            return false;
        }
        return true;
    }
    async onSignIn() {
        // this.appComponent.isLoading = true;
        this._uiHelper.showLoader('Signing-in...');
        if (this.isValidated()) {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: this.userData.email,
                    password: this.userData.password
                }
            }).then(
                async (result) => {
                    if (result.uid) {
                        console.log(result);
                        let userResult = await firebase.firestore.collection('users').doc(result.uid).get();
                        if(userResult.exists) {
                            let userParsedData = JSON.parse(JSON.stringify(userResult.data()));
                            this.userData = {
                                uid: userParsedData.uid,
                                imageUrl: userParsedData.imageUrl,
                                fullName: userParsedData.fullName,
                                contactNumber: userParsedData.contactNo,
                                email: result.email,
                                accountType: userParsedData.accountType,
                                confirmPassword: '',
                                password: '',
                                deliveryAddress: userParsedData.deliveryAddress
                            };
                            this._userDataService.updateUserData(this.userData);
                            console.dir(this._userDataService.user);
                        } else {
                            dialogs.alert({message: 'Unable to get your data from our database. Please contact us thru virtualbjorn.developer@gmail.com.', okButtonText: 'OK'});
                        }
                        // this.appComponent.isLoading = false;
                        this._uiHelper.hideLoader();
                        this.onAuthenticated();
                    }
                },
            ).catch((error) => {
                dialogs.alert({ message: error.split(': ')[1], okButtonText: 'OK' });
                this._uiHelper.hideLoader();
                // this.appComponent.isLoading = false;
            });
        } else {
            this._uiHelper.hideLoader();
            // this.appComponent.isLoading = false;
        }
    }

    onAuthenticated() {
        this.appComponent.isRegisteredUser = true;
        this.appComponent.navigationStack = [];
        this.appComponent.isOnLoginPage = false;
        this._navigationService.navigateToHome();
    }

    onSignUp() {
        this.appComponent.isOnLoginPage = false;
        this._navigationService.navigateToSignUp();
    }

    onGuestMode() {
        this.appComponent.isOnLoginPage = false;
        this._navigationService.navigateToHome();
    }
}