import { Injectable } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';
import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from 'ui/dialogs';

@Injectable()
export class FoodMenuService {
    private foodMenuData: FoodMenuData[];
    public foodMenuArray: any;

    constructor() {
        firebase.init({
            persist: true
        });
        this.setFoodMenuData();
    }

    get foodMenuList(): FoodMenuData[] {
        return this.foodMenuData;
    }

    resetFoodMenu() {
        this.setFoodMenuData();
    }

    public async setFoodMenuData(): Promise<boolean> {
        let result = await firebase.firestore.collection('food-outlet').doc('3xS7rLZkunAYrp1JA7jB').get();
        if (result.exists) {
            this.foodMenuArray = JSON.parse(JSON.stringify(result.data()));
            this.foodMenuData = new Array<FoodMenuData>();
            this.foodMenuArray['combo-ni-ante'].forEach((foodItem: any) => {
                this.foodMenuData.push(new FoodMenuData(foodItem.fN, foodItem.fPC, foodItem.fPS, foodItem.fd, false, foodItem.iA));
            });
            return true;
        } else {
            if (await dialogs.confirm({ message: 'Unable to parse data from remote server! Please try again.', okButtonText: 'OK' })) {
                this.setFoodMenuData();
            }
        }
    }
}