import { Component, NgZone } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page, EventData } from 'ui/page';
import { OrderCart } from '../../models/order-cart';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { UserDataService } from '../../services/user-data/user-data.service';
import * as dialogs from 'ui/dialogs';
import * as phone from 'nativescript-phone';
import * as connectivity from 'connectivity';
import { EmailService } from '~/services/email/email.service';
import * as moment from 'moment';
import { UserData } from '~/models/user-data';

@Component({
    moduleId: module.id,
    templateUrl: './cart.html',
    styleUrls: ['./cart.scss']
})

export class CartModalComponent {
    orderCart: OrderCart;
    orderID: string;
    orderDetail: string;
    userData: UserData;

    constructor(
        page: Page,
        private params: ModalDialogParams,
        private emailService: EmailService,
        public orderDataService: OrderDataService,
        private userDataService: UserDataService
    ) {
        this.userData = userDataService.user;
        this.orderCart = params.context;
        page.on('unloaded', () => {
            this.params.closeCallback();
        });
    }

    async checkOut() {
        this.orderID = this.userData.idNumber + moment().format('MMDDYYHHmm');
        this.orderDetail = `${this.userDataService.userDetails}\n\n${this.orderDataService.orderDetails}`;
        if (connectivity.getConnectionType() && this.emailService.checkEmailAvailability) {
            try {
                await this.emailService.compose(this.orderDetail, this.orderID);
            } catch (error) {
                await phone.sms(['+639163601454'], this.orderDetail);
            }
        } else {
            await phone.sms(['+639163601454'], this.orderDetail);
        }
    }

    removeFromCart(orderDataId: number) {
        this.orderCart.totalAmountPayable -= this.orderCart.orderData[orderDataId].totalPrice;
        this.orderCart.orderData.splice(orderDataId, 1);
    }

    backToFoodMenu() {
        this.params.closeCallback(false);
    }
}