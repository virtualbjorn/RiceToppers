import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, OnChanges, DoCheck, NgZone } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as firebase from 'nativescript-plugin-firebase';
import * as application from 'tns-core-modules/application';
import * as platform from 'tns-core-modules/platform';
import { GridLayout } from "ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color/color";
import { NavigationService } from "./services/navigation/navigation.service";
import { UserDataService } from "./services/user-data/user-data.service";
import { ActivatedRoute } from "@angular/router";
import { LoginComponent } from "./views/login/login.component";
import { FirebaseAPIService } from "./services/firebase-api/firebase-api.service";
import { UIHelperService } from "./services/ui-helper/ui-helper.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
    activeUsers: number = 0;
    fireStoreActiveUsers: firebase.firestore.DocumentReference;

    isOnLoginPage: boolean = true;
    isSignUpUser: boolean = false;

    isRegisteredUser: boolean = false;
    isOnHomePage: boolean = false;
    currentUserName: string;
    isLoading: boolean = false;

    navigationStack: string[] = [];

    @ViewChild('mainContent') private mainContent: GridLayout;
    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;

    private drawer: RadSideDrawer;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private _navigationService: NavigationService,
        private _userDataService: UserDataService,
        private _activatedRoute: ActivatedRoute,
        _ngZone: NgZone,
        private _ngFire: FirebaseAPIService,
        private _uiHelper: UIHelperService
    ) {
        let View = android.view.View;
        if (application.android && platform.device.sdkVersion >= '21') {
            this.changeStatusBarColor("#ff9900");
        }

        application.android.on(application.AndroidApplication.activityBackPressedEvent, (backPressed: any) => {
            backPressed.cancel = true;
            _ngZone.run(() => {
                if (!this.isOnHomePage && !this.isOnLoginPage) {
                    if (this.isSignUpUser) {
                        this.isSignUpUser = false;
                    }
                    if (this.navigationStack[this.navigationStack.length - 1] == 'order-list') {
                        this.navigationStack.pop();
                        this._navigationService.navigateToHome();
                    } else if (this.navigationStack[this.navigationStack.length - 1] != 'add-order-modal') {
                        this._navigationService.goBack();
                    } else {
                        this.navigationStack.pop();
                    }
                }
            });
        });
        this.currentUserName = this.isRegisteredUser ? _userDataService.user.firstName : "Guest";
        firebase.init({
            persist: true
        });
        application.on(application.resumeEvent, (args) => {
            console.log("App Resume");
            this.foreground();
        });

        application.on(application.suspendEvent, (args) => {
            console.log("App Suspended");
            this.suspended();
        });

    }

    async ngOnInit() {
        if (localStorage.getItem('User Data')) {
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
            this._userDataService.updateUserData(userData);
            this.navigationStack = [];
            this.isRegisteredUser = true;
            this.isOnLoginPage = false;
            this._navigationService.navigateToHome();
        }
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.drawer.gesturesEnabled = !this.isOnLoginPage;
        this.drawer.on('drawerClosedEvent', () => { this.changeStatusBarColor('#ff9900') });
        this._changeDetectionRef.detectChanges();
    }

    ngDoCheck() {
        try {
            if (this.isRegisteredUser || this.isOnHomePage) {
                this.drawer.gesturesEnabled = true;
            } else {
                this.drawer.gesturesEnabled = false;
            }
        } catch (err) {
            // console.log(err);
        }
    }

    foreground() {
        this.fireStoreActiveUsers = firebase.firestore.collection('active-users').doc('currentActiveUsers');
        this.fireStoreActiveUsers.get().then(doc => {
            if (doc.exists) {
                let remoteActiveUsers = JSON.parse(JSON.stringify(doc.data()));
                this.activeUsers = remoteActiveUsers.activeUsers;
                this.fireStoreActiveUsers.update({
                    activeUsers: this.activeUsers + 1
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    suspended() {
        this.fireStoreActiveUsers = firebase.firestore.collection('active-users').doc('currentActiveUsers');
        this.fireStoreActiveUsers.get().then(doc => {
            if (doc.exists) {
                let remoteActiveUsers = JSON.parse(JSON.stringify(doc.data()));
                this.activeUsers = remoteActiveUsers.activeUsers;
                this.fireStoreActiveUsers.update({
                    activeUsers: this.activeUsers - 1
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    public openDrawer() {
        this.changeStatusBarColor('#707070');
        this.drawer.showDrawer();
    }

    public onDrawerClosed() {
        setTimeout(() => {
            this.changeStatusBarColor('#ff9900');
        }, 260);
    }

    public backToLogin() {
        this._navigationService.goBack();
        this.isSignUpUser = false;
    }

    onHome() {
        this._navigationService.navigateToHome();
        this.drawer.closeDrawer();
    }

    onAccountSettings() {
        this._navigationService.navigateToAccount();
        this.drawer.closeDrawer();
    }

    onViewOrderHistory() {
        this._navigationService.navigateToOrderHistory();
        this.drawer.closeDrawer();
    }

    onSignOut() {
        this._navigationService.navigateToLogin();;
        this.navigationStack = [];
        localStorage.removeItem('User Data');
        this.isRegisteredUser = false;
        this.drawer.closeDrawer();
    }

    onSignIn() {
        this._navigationService.goBack();
        this.drawer.closeDrawer();
    }

    onSignUp() {
        this._navigationService.navigateToSignUp();
    }

    addToNavigationStack(currentRouteUrl: string) {
        if (currentRouteUrl === 'home') {
            this.navigationStack = [];
            this.navigationStack.push(currentRouteUrl);
        } else {
            if (this.navigationStack.find(routeUrl => routeUrl === currentRouteUrl) != undefined) {
                let oldIndex: number = this.navigationStack.findIndex(routeUrl => routeUrl === currentRouteUrl);
                console.log(oldIndex);
                this.navigationStack.splice(oldIndex, 1);
                this.navigationStack.push(currentRouteUrl);
                console.dir(this.navigationStack);
            } else {
                this.navigationStack.push(currentRouteUrl);
                console.dir(this.navigationStack);
            }
        }
    }

    changeStatusBarColor(color: string) {
        if (application.android && platform.device.sdkVersion >= '21') {
            let window = application.android.startActivity.getWindow();
            window.setStatusBarColor(new Color(color).android);
            window.setNavigationBarColor(new Color(color).android);
        }
    }
}