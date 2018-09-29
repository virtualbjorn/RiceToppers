import { Component, NgZone } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page, EventData } from 'ui/page';
import { OrderCart } from '../../models/order-cart';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';

@Component({
    moduleId: module.id,
    templateUrl: './cart.html',
    styleUrls: ['./cart.scss']
})

export class CartModalComponent {
    orderCart: OrderCart;
    constructor(
        private params: ModalDialogParams,
        private page: Page,
        private ngZone: NgZone,
        public orderDataService: OrderDataService,
        public userDataService: UserDataService
    ) {
        this.orderCart = params.context;
        page.on('unloaded', () => {
            this.params.closeCallback();
        });
    }

    async checkOut() {
        await dialogs.alert({ message: 'Your order has been sent. You will receive a message confirmation in awhile.', okButtonText: 'OK' });
        this.params.closeCallback(true);
    }

    removeFromCart(orderDataId: number) {
        this.orderCart.totalAmountPayable -= this.orderCart.orderData[orderDataId].totalPrice;
        this.orderCart.orderData.splice(orderDataId, 1);
    }

    backToFoodMenu() {
        this.params.closeCallback(false);
    }
}