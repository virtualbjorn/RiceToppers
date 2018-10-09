import { Component, ViewContainerRef } from '@angular/core';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";
import { AddOrderModalComponent } from '../../modals/add-order/add-order';
import { CartModalComponent } from '../../modals/cart/cart';
import { NavigationService } from '../../services/navigation/navigation.service';
import { OrderData } from '~/models/order-data';
import { UserDataService } from '~/services/user-data/user-data.service';
import { UserData } from '~/models/user-data';
import * as connectivity from 'connectivity';
import { EmailService } from '~/services/email/email.service';
import * as moment from 'moment';
import * as phone from 'nativescript-phone';
import * as dialogs from 'ui/dialogs';

@Component({
    selector: "orderPage",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.scss"]
})
export class OrderComponent {
    orderID: string;
    orderDetail: string;
    userData: UserData;
    isSMS: boolean;
    constructor(
        private vcRef: ViewContainerRef,
        private _modalDialog: ModalDialogService,
        private navigationService: NavigationService,
        private emailService: EmailService,
        public orderDataService: OrderDataService,
        private userDataService: UserDataService
    ) {
        this.userData = userDataService.user;
    }

    openFoodMenuModal(orderData) {
        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: orderData || null,
            fullscreen: true
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

    removeOrderData(orderDataId: number) {
        this.orderDataService.orderCart.totalAmountPayable -= this.orderDataService.orderCart.orderData[orderDataId].totalPrice;
        this.orderDataService.orderCart.orderData.splice(orderDataId, 1);
    }

    modifyOrderData(orderDataId: number) {
        this.openFoodMenuModal(this.orderDataService.orderCart.orderData[orderDataId]);
    }

    sendThroughSMS(isSMSCB) {
        this.isSMS = isSMSCB.value;
    }

    async checkOut() {
        this.orderID = this.userData.idNumber + moment().format('MMDDYYHHmm');
        this.orderDetail = `${this.userDataService.userDetails}\n\n${this.orderDataService.orderDetails}`;
        if (connectivity.getConnectionType() && this.emailService.checkEmailAvailability && this.isSMS) {
            try {
                this.emailService.compose(this.orderDetail, this.orderID);
            } catch (error) {
                phone.sms(['+639163601454'], this.orderDetail);
            }
        } else {
            phone.sms(['+639163601454'], this.orderDetail);
        }
        if (await dialogs.confirm({ message: "Please tap OK if you've already sent your order.", okButtonText: 'OK', cancelButtonText: 'NO' })) {
            this.orderDataService.resetOrders();
            this.navigationService.navigateToProfilePage();
        }
    }
}