import { Component, NgZone, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page, EventData } from 'ui/page';
import { OrderData } from '../../models/order-data';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { FoodMenuData } from '~/models/food-menu-data';
import { FoodMenuService } from '~/services/food-menu-data/food-menu-data.service';
import { StackLayout } from 'ui/layouts/stack-layout';
import * as firebase from 'nativescript-plugin-firebase';

@Component({
    moduleId: module.id,
    templateUrl: './add-order.html',
    styleUrls: ['./add-order.scss']
})

export class AddOrderModalComponent implements OnInit {
    @ViewChild('stackContainer') stackContainer: ElementRef;
    stackLayout: StackLayout;

    foodMenuList: FoodMenuData[];
    foodMenuArray: any;
    orderData: OrderData = new OrderData();
    selectedFoodItem: number = 0;
    // isCombo: boolean;
    // isRiceAdded: boolean;

    constructor(
        private params: ModalDialogParams,
        page: Page,
        private ngZone: NgZone,
        public orderDataService: OrderDataService,
        public foodMenuService: FoodMenuService
    ) {
        this.foodMenuList = foodMenuService.foodMenuList;
        this.orderData = params.context;
    }

    ngOnInit() {
        if (this.orderData) {
            this.foodMenuList[this.orderData.foodItemIndex[0]].isSelected = true;
            this.foodMenuList[this.orderData.foodItemIndex[1]].isSelected = true;
            this.selectedFoodItem = 2;
            this.stackLayout = this.stackContainer.nativeElement;
            this.stackLayout.className = 'border-top-list food-list-container-1 active';
        } else {
            this.orderData = new OrderData();
            this.orderData.productPrice = 50;
        }
    }

    // onComboSwitchChecked(switchEvent) {
    //     let comboSwitch = <Switch>switchEvent.object;
    //     this.isCombo = comboSwitch.checked;
    // }

    // addRice(riceCheckEvent) {
    //     this.isRiceAdded = riceCheckEvent.value;
    // }

    updateOrderData(checkedFoodItem: any, foodItem: FoodMenuData) {
        if (checkedFoodItem.value) {
            ++this.selectedFoodItem;
            foodItem.isSelected = true;
        } else {
            if (this.selectedFoodItem == 2) {
                this.stackLayout = this.stackContainer.nativeElement;
                this.stackLayout.className = 'border-top-list food-list-container-1 disabled';
            }
            --this.selectedFoodItem;
            foodItem.isSelected = false;
        }
        if (this.selectedFoodItem == 2) {
            this.foodMenuList.map((foodItem, index) => {
                if (foodItem.isSelected) {
                    this.orderData.foodItemIndex.push(index);
                    this.orderData.productName == '' ? this.orderData.productName = foodItem.foodName : this.orderData.productName = this.orderData.productName.concat(' + ' + foodItem.foodName);
                }
            });
            this.orderData.piecesToOrder = 1;
            this.stackLayout = this.stackContainer.nativeElement;
            this.stackLayout.className = 'border-top-list food-list-container-1 active';
        } else {
            this.orderData.foodItemIndex = [];
            this.orderData.productName = '';
            this.orderData.piecesToOrder = 0;
        }
    }

    updatePrice() {
        this.ngZone.run(() => {
            this.orderData.totalPrice = this.orderData.productPrice * this.orderData.piecesToOrder;
        });
    }

    updatePiecesToOrder(updatePcs: string) {
        updatePcs == '+' ? ++this.orderData.piecesToOrder : --this.orderData.piecesToOrder;
    }

    addOrder() {
        this.orderDataService.addOrder(this.orderData);
        this.foodMenuService.resetFoodMenu();
        this.params.closeCallback();
    }

    onCloseModal() {
        this.params.closeCallback();
    }
}