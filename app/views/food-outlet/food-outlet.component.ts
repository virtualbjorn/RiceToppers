import { Component } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';
import * as firebase from 'nativescript-plugin-firebase';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { EventData } from 'tns-core-modules/ui/page/page';

@Component({
    selector: "foodOutletPage",
    moduleId: module.id,
    templateUrl: "./food-outlet.component.html",
    styleUrls: ["./food-outlet.component.scss"]
})
export class FoodOutletComponent {
    foodMenuData: FoodMenuData[] = new Array<FoodMenuData>();
    foodMenuArray: any;
    foodMenuArrayTemp: any;

    constructor() {
        firebase.init({
            persist: true
        });
        firebase.getValue('/food-menu')
            .then(result => {
                let foodMenu = JSON.parse(JSON.stringify(result));
                this.foodMenuArray = foodMenu.value;
                this.foodMenuArray.forEach((foodItem: FoodMenuData) => {
                    this.foodMenuData.push(new FoodMenuData(foodItem.foodName, foodItem.foodPriceCombo, foodItem.foodPriceSingle, true, foodItem.isAvailable));
                });
            })
            .catch(error => console.log("Error: " + error));
    }

    toggleAvailability(foodItemIndex: number, args: EventData) {
        let switchObject = <Switch>args.object;
        console.log(switchObject.checked);
        this.foodMenuArray[foodItemIndex].isAvailable = switchObject.checked;
        this.updateFoodMenu(foodItemIndex);
    }

    updateFoodMenu(foodItemIndex: number) {
        firebase.update(
            `/food-menu/${foodItemIndex}`,
            {
                "isAvailable": this.foodMenuArray[foodItemIndex].isAvailable
            }
        );
    }
}