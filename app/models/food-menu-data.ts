export class FoodMenuData {
    foodName: string;
    foodPriceCombo: number;
    foodPriceSingle: number;
    isSelected: boolean;
    isAvailable: boolean;

    constructor(foodName: string, foodPriceCombo: number, foodPriceSingle: number, isSelected: boolean, isAvailable: boolean) {
        this.foodName = foodName;
        this.foodPriceCombo = foodPriceCombo;
        this.foodPriceSingle = foodPriceSingle;
        this.isSelected = isSelected;
        this.isAvailable = isAvailable;
    }
}