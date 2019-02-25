import { Component, OnInit } from "@angular/core";
import { AppComponent } from "~/app.component";
import { NavigationService } from "~/services/navigation/navigation.service";
import * as firebase from 'nativescript-plugin-firebase';
import { UserData } from "~/models/user-data";
import * as dialogs from 'ui/dialogs';
import { UIHelperService } from "~/services/ui-helper/ui-helper.service";
import { UserDataService } from "~/services/user-data/user-data.service";
import { FirebaseAPIService } from "~/services/firebase-api/firebase-api.service";

@Component({
    selector: 'app-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    isLoading: boolean = false;
    userData: UserData = new UserData();
    constructor(
        public appComponent: AppComponent,
        private _navigationService: NavigationService,
        private _uiHelper: UIHelperService,
        private _userDataService: UserDataService,
        private _ngFire: FirebaseAPIService
    ) {
        appComponent.addToNavigationStack('login');
        appComponent.isOnLoginPage = true;
    }

    async ngOnInit() {
        if (localStorage.getItem('User Data')) {
            this._uiHelper.showLoader();
            let userData = JSON.parse(JSON.stringify(localStorage.getItem('User Data')));
            let result = await this._ngFire.getUserData(userData);
            let userParsedData = JSON.parse(JSON.stringify(result.data()));
            userData = {
                uid: userParsedData.uid,
                imageUrl: userParsedData.imageUrl,
                firstName: userParsedData.firstName,
                middleName: userParsedData.middleName,
                lastName: userParsedData.lastName,
                contactNo: userParsedData.contactNo,
                email: userParsedData.email,
                accountType: userParsedData.accountType,
                confirmPassword: '',
                password: userData.password,
                address: userParsedData.address
            };
            this._uiHelper.hideLoader();
            this._userDataService.updateUserData(userData);
            this.appComponent.navigationStack = [];
            this.appComponent.isRegisteredUser = true;
            this.appComponent.isOnLoginPage = false;
            this._navigationService.navigateToHome();
        }
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
        this._ngFire.checkForConnectivity() ? null : await dialogs.alert({ message: 'No Internet Connection Detected', okButtonText: 'Ok' });
        if (this.isValidated()) {
            this._uiHelper.showLoader('Signing-in...');
            try {
                let result = await this._ngFire.authenticateUser(this.userData.email, this.userData.password);
                if (result.uid) {
                    let userResult = await this._ngFire.getUserData({ accountType: 'customer', uid: result.uid });
                    if (userResult.exists) {
                        let userParsedData = JSON.parse(JSON.stringify(userResult.data()));
                        this.userData = {
                            uid: userParsedData.uid,
                            imageUrl: userParsedData.imageUrl,
                            firstName: userParsedData.firstName,
                            middleName: userParsedData.middleName,
                            lastName: userParsedData.lastName,
                            contactNo: userParsedData.contactNo,
                            email: result.email,
                            accountType: userParsedData.accountType,
                            confirmPassword: '',
                            password: this.userData.password,
                            address: userParsedData.address
                        };
                        this._userDataService.updateUserData(this.userData);
                        console.dir(this._userDataService.user);
                    } else {
                        dialogs.alert({ message: 'Unable to get your data from our database. Please contact us thru virtualbjorn.developer@gmail.com.', okButtonText: 'OK' });
                    }
                    this._uiHelper.hideLoader();
                    this.onAuthenticated();
                }
            } catch (error) {
                this._uiHelper.hideLoader();
                dialogs.alert({ message: error.split(': ')[1], okButtonText: 'OK' });
                console.log(error);
            }
        } else {
            this._uiHelper.hideLoader();
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