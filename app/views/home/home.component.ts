import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, DoCheck, ChangeDetectorRef, NgZone } from "@angular/core";
import { FoodMenuService } from "~/services/food-menu-data/food-menu-data.service";
import { NavigationService } from "~/services/navigation/navigation.service";
import { AppComponent } from "~/app.component";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    constructor(
        public _foodMenuDataService: FoodMenuService,
        private _navigationService: NavigationService,
        private appComponent: AppComponent
    ) {
        appComponent.addToNavigationStack('home');
        appComponent.isOnHomePage = true;
    }

    async onSyncFoodMenu() {
        await this._foodMenuDataService.setFoodMenuData();
    }

    onOrderNow() {
        if (this.appComponent.isRegisteredUser) {
            this.appComponent.addToNavigationStack('order-list');
            this.appComponent.isOnHomePage = false;
            this._navigationService.navigateToOrderList();
        } else {
            this.appComponent.navigationStack = [];
            this.appComponent.isOnHomePage = false;
            this._navigationService.navigateToLogin();
        }
    }
}