import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef, OnChanges, DoCheck } from "@angular/core";
import { PageRoute } from "nativescript-angular/router";
import { switchMap } from 'rxjs/operators';
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import firebase = require('nativescript-plugin-firebase');
import application = require('tns-core-modules/application');
import platform = require('tns-core-modules/platform');
import { GridLayout } from "ui/layouts/grid-layout";
import { Color } from "tns-core-modules/color/color";
import { NavigationService } from "./services/navigation/navigation.service";
import { UserDataService } from "./services/user-data/user-data.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements AfterViewInit, DoCheck {
    activeUsers: number = 0;
    fireStoreActiveUsers: firebase.firestore.DocumentReference;
    isLoggedIn: boolean = true;
    isGuestMode: boolean = false;
    isOnHomePage: boolean = false;
    currentUserName: string;
    isLoading: boolean = false;
    @ViewChild('mainContent') private mainContent: GridLayout;

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private _navigationService: NavigationService,
        private _userDataService: UserDataService,
        private _activatedRoute: ActivatedRoute
    ) {
        let View = android.view.View;
        if (application.android && platform.device.sdkVersion >= '21') {
            this.changeStatusBarColor("#ff9900");
        }
        this.currentUserName = this.isLoggedIn ? "Bryan" : "Guest";
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.drawer.on('drawerClosedEvent', () => { this.changeStatusBarColor('#ff9900') });
        this._changeDetectionRef.detectChanges();
    }

    ngDoCheck() {
        try {
            if (this._activatedRoute.snapshot.firstChild.url[0].toString() == 'home') {
                this.isOnHomePage = true;
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

    onAccountSettings() {
        this._navigationService.navigateToAccountPage();
    }

    onSignout() {
        this._navigationService.navigateToSignupPage();
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

    onGuestMode() {
        this.isLoading = !this.isLoading;
        setTimeout(() => {
            this.isLoggedIn = !this.isLoggedIn;
            this.isLoading = !this.isLoading;
            this.isGuestMode = !this.isGuestMode;
            this._navigationService.navigateToAccountPage();
        }, 500);
    }

    changeStatusBarColor(color: string) {
        if (application.android && platform.device.sdkVersion >= '21') {
            let window = application.android.startActivity.getWindow();
            window.setStatusBarColor(new Color(color).android);
            window.setNavigationBarColor(new Color(color).android);
        }
    }
}
export function onPageLoaded() {

}