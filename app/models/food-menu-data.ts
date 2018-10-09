export class FoodMenuData {
    foodName: string;
    foodPriceCombo: number;
    foodPriceSingle: number;
    isSelected: boolean;

    constructor(foodName: string, foodPriceCombo: number, foodPriceSingle: number, isSelected: boolean) {
        this.foodName = foodName;
        this.foodPriceCombo = foodPriceCombo;
        this.foodPriceSingle = foodPriceSingle;
        this.isSelected = isSelected;
    }
}