import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from "@angular/core";
import { FoodMenuService } from "~/services/food-menu-data/food-menu-data.service";

@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
    isFoodMenuLoading: boolean = true;

    constructor(public _foodMenuDataService: FoodMenuService) {
        this.onSyncFoodMenu();
    }

    async onSyncFoodMenu() {
        this.isFoodMenuLoading = true;
        if (await this._foodMenuDataService.setFoodMenuData) {
            setTimeout(() => {
                this.isFoodMenuLoading = false;
            }, 1000);
        }
    }
}