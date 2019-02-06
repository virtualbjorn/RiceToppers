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
    constructor(
        private _navigationService: NavigationService,
        private appComponent: AppComponent,
        private _uiHelper: UIHelperService
    ) {
        appComponent.isSignUpUser = true;
        this.userData.accountType = 'Customer';
    }

    isValidated(): boolean {
        if (!this.selectedImagePath) {
            dialogs.alert({ message: 'Please upload an image.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.email) {
            dialogs.alert({ message: 'Please enter a valid email address.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.fullName) {
            dialogs.alert({ message: 'Please enter a valid name.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.contactNumber) {
            dialogs.alert({ message: 'Please enter a valid contact number.', okButtonText: 'OK' });
            return false;
        }
        if (!this.userData.deliveryAddress) {
            dialogs.alert({ message: 'Please enter a valid delivery address.', okButtonText: 'OK' });
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

    async onSignUp() {
        // this.appComponent.isLoading = true;
        this._uiHelper.showLoader('Signing-up...');
        if (this.isValidated()) {
            try {
                let createUserResult: firebase.User = await firebase.createUser({
                    email: this.userData.email,
                    password: this.userData.password
                });
                await firebase.storage.uploadFile({
                    remoteFullPath: `user-profile-images/${createUserResult.uid}.png`,
                    localFile: fs.File.fromPath(this.selectedImagePath),
                    onProgress: (status) => {
                        console.log("Uploaded fraction: " + status.fractionCompleted);
                        console.log("Percentage complete: " + status.percentageCompleted);
                    }
                });
                let downloadUrlResult = await firebase.storage.getDownloadUrl({
                    remoteFullPath: `user-profile-images/${createUserResult.uid}.png`
                });
                firebase.firestore.collection('users').doc(createUserResult.uid).set({
                    uid: createUserResult.uid,
                    accountCreated: createUserResult.metadata.creationTimestamp,
                    fullName: this.userData.fullName,
                    contactNo: this.userData.contactNumber,
                    deliveryAddress: this.userData.deliveryAddress,
                    imageUrl: downloadUrlResult,
                    accountType: 'Customer',
                    email: createUserResult.email
                });
                this._uiHelper.hideLoader();
                // this.appComponent.isLoading = false;
                dialogs.alert({ message: 'Sign-up successful!', okButtonText: 'OK' });
                this.appComponent.isSignUpUser = false;
                this._navigationService.navigateToLogin();
            } catch (error) {
                dialogs.alert({ message: error.split(': ')[1], okButtonText: 'OK' });
                this._uiHelper.hideLoader();
                // this.appComponent.isLoading = false;
            }
        } else {
            this._uiHelper.hideLoader();
            // this.appComponent.isLoading = false;
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
}