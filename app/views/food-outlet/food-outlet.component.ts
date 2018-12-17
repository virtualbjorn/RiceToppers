import { Component } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';
import * as firebase from 'nativescript-plugin-firebase';
import { Switch } from 'tns-core-modules/ui/switch/switch';

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
                let foodMenu = JSON.stringify(result);
                console.dir(foodMenu);
                // this.foodMenuArray = JSON.parse(JSON.stringify(foodMenuParse.value));
                // for (let foodItem in this.foodMenuArray) {
                //     this.foodMenuData.push(new FoodMenuData(foodItem, this.foodMenuArray[foodItem].foodPriceCombo, this.foodMenuArray[foodItem].foodPriceSingle, true, this.foodMenuArray[foodItem].isAvailable));
                // }
                // console.dir(this.foodMenuData);
            })
            .catch(error => console.log("Error: " + error));
    }

    toggleAvailability(foodItem, args) {
        let switchObject = <Switch>args.object;
        let currentFoodItem = JSON.parse(JSON.stringify(foodItem));
        currentFoodItem.isAvailable = !switchObject.checked;
        this.updateFoodMenu(currentFoodItem);
    }

    updateFoodMenu(foodItem: any) {
        let updateString = JSON.stringify(`{'${foodItem.foodName}': { 'isAvailable': ${foodItem.isAvailable}, 'foodPriceCombo': 10, 'foodPriceSingle': 15 }}`);
        console.dir(updateString);
        firebase.update(
            `/foodmenu/${foodItem.foodName}`,
            {
                "isAvailable": foodItem.foodName
            }
        );
    }
}