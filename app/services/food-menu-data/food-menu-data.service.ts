import { Injectable } from '@angular/core';
import { FoodMenuData } from '~/models/food-menu-data';

@Injectable()
export class FoodMenuService {
    private foodMenuData: FoodMenuData[];

    constructor() {
        this.setFoodMenuData();
    }

    get foodMenuList(): FoodMenuData[] {
        return this.foodMenuData;
    }

    resetFoodMenu() {
        this.setFoodMenuData();
    }

    private setFoodMenuData() {
        this.foodMenuData = new Array<FoodMenuData>();
        this.foodMenuData.push(new FoodMenuData('Chicken Fillet', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Chicken Cordon Bleu', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Kawali', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Afritada', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Steak', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Sisig', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Humba', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Pork Bico Xpress', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Ampalaya', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Egg (Fried Sunny Side Up)', 10, 15, false, true));
        this.foodMenuData.push(new FoodMenuData('Lumpia Shanghai (Pork)', 10, 15, false, true));
    }
    // foodMenu = [
    //     { foodName: 'Chicken Fillet', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Chicken Cordon Bleu', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Kawali', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Afritada', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Steak', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Sisig', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Humba', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Pork Bico Xpress', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Ampalaya', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Egg (Fried Sunny Side Up)', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true },
    //     { foodName: 'Lumpia Shanghai (Pork)', foodPriceCombo: 10, foodPriceSingle: 15, isAvailable: true }
    // ]
}