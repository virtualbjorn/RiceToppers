import { Component } from "@angular/core";
import { UserData } from "~/models/user-data";
import { UserDataService } from "~/services/user-data/user-data.service";
import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from 'ui/dialogs';
import { NavigationService } from "~/services/navigation/navigation.service";
import { AppComponent } from "~/app.component";
import { UIHelperService } from "~/services/ui-helper/ui-helper.service";
import * as imagepicker from "nativescript-imagepicker";
import { isAndroid } from "tns-core-modules/ui/page/page";
import * as fs from 'file-system';
import { fromAsset } from "tns-core-modules/image-source/image-source";
import { FirebaseAPIService } from "~/services/firebase-api/firebase-api.service";

@Component({
    selector: 'app-signup',
    moduleId: module.id,
    templateUrl: './signup.component.html',
    styleUrls: ['../account-and-signup.scss']
})
export class SignUpComponent {
    userData: UserData = new UserData();
    uploadedImageData: any;
    selectedImagePath: string;
    isImageUploaded: boolean = false;

    addressCount: number = 1;
    tempAddressArray: string[] = new Array<string>(this.addressCount);

    constructor(
        private _navigationService: NavigationService,
        private appComponent: AppComponent,
        private _uiHelper: UIHelperService,
        private _ngFire: FirebaseAPIService
    ) {
        appComponent.isSignUpUser = true;
        this.userData.address = new Array<string>();
        this.userData.accountType = 'Customer';
    }

    isValidated(): boolean {
        if (!this.userData.email) {
            dialogs.alert({ message: 'Please enter a valid email address.', okButtonText: 'OK' });
            return false;
        } else if (!this.userData.firstName) {
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

    async onSignUp() {
        this._uiHelper.showLoader('Signing-up...');
        if (this.isValidated()) {
            try {
                let createUserResult: firebase.User = await this._ngFire.createUser(this.userData.email, this.userData.password);
                if (this.selectedImagePath) {
                    this._ngFire.uploadFile(this.selectedImagePath, createUserResult.uid);
                }
                let userData: UserData = {
                    uid: createUserResult.uid,
                    accountCreated: createUserResult.metadata.creationTimestamp.toString(),
                    firstName: this.userData.firstName,
                    middleName: this.userData.middleName,
                    lastName: this.userData.lastName,
                    contactNo: this.userData.contactNo,
                    address: this.userData.address,
                    imageUrl: '',
                    accountType: this.userData.accountType.toLowerCase(),
                    email: createUserResult.email
                };
                let success = await this._ngFire.createUserData(userData);
                this._uiHelper.hideLoader();
                dialogs.alert({ message: 'Sign-up successful!', okButtonText: 'OK' });
                this.appComponent.isSignUpUser = false;
                this._navigationService.navigateToLogin();
            } catch (error) {
                console.dir(error);
                dialogs.alert({ message: error.split(': ')[1], okButtonText: 'OK' });
                this._uiHelper.hideLoader();
            }
        } else {
            this._uiHelper.hideLoader();
        }
    }

    onUploadImage() {
        let context = imagepicker.create({
            mode: "single" // use "multiple" for multiple selection
        });
        context.authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                if (isAndroid) {
                    this.selectedImagePath = `${fs.knownFolders.temp().path}/selected-image.png`;
                    fromAsset(selection[0]).then((data) => {
                        data.saveToFile(this.selectedImagePath, 'png');
                        this.uploadedImageData = data.fromFile(this.selectedImagePath);
                    });
                    this.isImageUploaded = true;
                }
            }).catch((e) => {
                // process error
                this.isImageUploaded = false;
            });
    }

    onAddNewAddress() {
        this.userData.address[this.addressCount++] = '';
        this.tempAddressArray = new Array<string>(this.addressCount);
    }

    onRemoveAddress(index: number) {
        this.tempAddressArray.splice(index, 1);
        this.userData.address.splice(index, 1);
        --this.addressCount;
    }
}