import { Injectable } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';
import * as firebase from 'nativescript-plugin-firebase';
import * as dialogs from 'ui/dialogs';
import * as connectivity from 'connectivity';

@Injectable()
export class FoodMenuService {
    private foodMenuData: FoodMenuData[];
    public foodMenuArray: any;
    public isFoodMenuParsed: boolean = false;

    constructor() {
        this.setFoodMenuData();
    }

    get foodMenuList(): FoodMenuData[] {
        return this.foodMenuData;
    }

    resetFoodMenu() {
        this.setFoodMenuData();
    }

    public async setFoodMenuData(): Promise<boolean> {
        if (connectivity.getConnectionType() > 0) {
            this.isFoodMenuParsed = false;
            let result = await firebase.firestore.collection('food-menu').doc('c7XF1A8j1JX0mVemGBS7f7aKHcx1').get();
            if (result.exists) {
                this.foodMenuArray = JSON.parse(JSON.stringify(result.data()));
                this.foodMenuData = new Array<FoodMenuData>();
                this.foodMenuArray.foodMenu.forEach((foodItem: any) => {
                    this.foodMenuData.push(new FoodMenuData(foodItem.fN, foodItem.fPC, foodItem.fPS, foodItem.fD, false, foodItem.iA));
                });
                this.isFoodMenuParsed = true;
                return true;
            } else {
                if (await dialogs.confirm({ message: 'Unable to parse data from remote server! Please try again.', okButtonText: 'OK' })) {
                    this.isFoodMenuParsed = true;
                    this.setFoodMenuData();
                }
            }
            console.dir(result);
        } else {
            await dialogs.confirm({ message: 'No Internet Connection', okButtonText: 'OK' });
            this.isFoodMenuParsed = true;
        }
    }
}