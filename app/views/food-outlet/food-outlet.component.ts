import { Component, OnInit } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';
import * as firebase from 'nativescript-plugin-firebase';
import { Switch } from 'tns-core-modules/ui/switch/switch';
import { EventData } from 'tns-core-modules/ui/page/page';
import * as dialogs from 'ui/dialogs';

@Component({
    selector: "foodOutletPage",
    moduleId: module.id,
    templateUrl: "./food-outlet.component.html",
    styleUrls: ["./food-outlet.component.scss"]
})
export class FoodOutletComponent implements OnInit {
    foodMenuData: FoodMenuData[] = new Array<FoodMenuData>();
    foodMenuArray: any;
    foodMenuFirestoreResult: firebase.firestore.DocumentReference;
    isLoading: boolean = true;

    constructor() {
        firebase.init({
            persist: true
        });
    }

    ngOnInit() {
        this.getFoodMenu()
    }

    async getFoodMenu() {
        this.foodMenuFirestoreResult = firebase.firestore.collection('food-outlet').doc('3xS7rLZkunAYrp1JA7jB');
        let result = await this.foodMenuFirestoreResult.get();
        if (result.exists) {
            let foodMenuArrayResult = JSON.parse(JSON.stringify(result.data()));
            this.foodMenuArray = foodMenuArrayResult['combo-ni-ante'];
            foodMenuArrayResult['combo-ni-ante'].forEach((foodItem: any) => {
                this.foodMenuData.push(new FoodMenuData(foodItem.fN,foodItem.fPC, foodItem.fPS, foodItem.fD, false, foodItem.iA));
            });
            setTimeout(() => {
                this.isLoading = !this.isLoading;
            }, 1000);
        } else {
            if (await dialogs.confirm({ message: 'Unable to parse data from remote server! Please try again.', okButtonText: 'OK' })) {
                this.getFoodMenu();
            }
        }
    }

    toggleAvailability(foodItemIndex: number, args: EventData) {
        let switchObject = <Switch>args.object
        this.foodMenuArray[foodItemIndex].iA = switchObject.checked;
        // console.dir(this.foodMenuArray);
        // console.log(switchObject.checked);
        // this.foodMenuArray[foodItemIndex].isAvailable = switchObject.checked;
        if(!this.isLoading) {
            this.updateFoodMenu();
        }
    }

    updateFoodMenu() {
        this.foodMenuFirestoreResult.update({
            "combo-ni-ante": this.foodMenuArray
        }).then(() => console.log('remote db updated')).catch(error => { console.dir(error) });
        // firebase.update(
        //     `/food-menu/${foodItemIndex}`,
        //     {
        //         "isAvailable": this.foodMenuArray[foodItemIndex].isAvailable
        //     }
        // );
    }
}