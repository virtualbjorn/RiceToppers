import { Component, ViewContainerRef } from '@angular/core';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";
import { AddOrderModalComponent } from '../../modals/add-order/add-order';
import { CartModalComponent } from '../../modals/cart/cart';
import { NavigationService } from '../../services/navigation/navigation.service';
import { OrderData } from '~/models/order-data';

@Component({
    selector: "orderPage",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent {
    productList: OrderData[];
    constructor(
        private vcRef: ViewContainerRef,
        private _modalDialog: ModalDialogService,
        private navigationService: NavigationService,
        public orderDataService: OrderDataService
    ) {
        this.productList = orderDataService.productData;
    }

    openFoodModal(productName: string) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: productName,
            fullscreen: false
        };
        this._modalDialog.showModal(AddOrderModalComponent, options);
    }

    async openCartModal() {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: this.orderDataService.orderCart,
            fullscreen: true
        };
        await this._modalDialog.showModal(CartModalComponent, options);
        this.orderDataService.resetOrders();
        this.navigationService.goBack();
    }
}