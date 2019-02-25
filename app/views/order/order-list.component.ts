import { Component, ViewContainerRef } from '@angular/core';
import { OrderDataService } from '../../services/order-data/order-data.service';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular";
import { AddOrderModalComponent } from '../../modals/add-order/add-order';
import { NavigationService } from '../../services/navigation/navigation.service';
import { UserDataService } from '~/services/user-data/user-data.service';
import { UserData } from '~/models/user-data';
import * as connectivity from 'connectivity';
import { EmailService } from '~/services/email/email.service';
import * as moment from 'moment';
import * as phone from 'nativescript-phone';
import * as dialogs from 'ui/dialogs';
import { AppComponent } from '~/app.component';
import { FirebaseAPIService } from '~/services/firebase-api/firebase-api.service';

@Component({
    selector: "orderList",
    moduleId: module.id,
    templateUrl: "./order-list.component.html",
    styleUrls: ["./order-list.component.scss"]
})
export class OrderListComponent {
    orderID: string;
    orderDetail: string;
    userData: UserData;
    isSMS: boolean = false;
    isReserveOrder: boolean = false;

    constructor(
        private vcRef: ViewContainerRef,
        private _modalDialog: ModalDialogService,
        private navigationService: NavigationService,
        private emailService: EmailService,
        public orderDataService: OrderDataService,
        private userDataService: UserDataService,
        private appComponent: AppComponent,
        private _ngFire: FirebaseAPIService
    ) {
        appComponent.addToNavigationStack('order-list');
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

    removeOrderData(orderDataId: number) {
        this.orderDataService.orderCart.totalAmountPayable -= this.orderDataService.orderCart.orderData[orderDataId].totalPrice;
        this.orderDataService.orderCart.orderData.splice(orderDataId, 1);
    }

    modifyOrderData(orderDataId: number) {
        this.openFoodMenuModal(this.orderDataService.orderCart.orderData[orderDataId]);
    }

    sendThroughSMS(isSMSCB) {
        this.isSMS = isSMSCB.checked;
    }

    reserveOrder(isReserveCB) {
        this.isReserveOrder = isReserveCB.checked;
    }

    async sendOrder() {
        if (this.orderDataService.orderCart.orderData.length && this.orderDataService.orderCart.totalAmountPayable >= 100) {
            let timecreated = moment().format('MM/DD/YY-HH:mm');
            this.orderID = this.userData.uid + moment().format('MMDDYYHHmm');
            let userDetails = await this.userDataService.userDetails();
            this.orderDetail = `Customer Details\nName: ${userDetails.name}\nContact Number: ${userDetails.contactNo}\nDelivery Address: ${userDetails.deliveryAddress}\nOrder Type: For ${this.isReserveOrder ? 'Reservation' : 'Delivery'}\n\n${this.orderDataService.orderDetails}`;

            if (this.isSMS) {
                phone.sms(['+639163601454'], this.orderDetail);
            } else if (connectivity.getConnectionType() && this.emailService.checkEmailAvailability()) {
                try {
                    this.emailService.compose(this.orderDetail, this.orderID, this.isReserveOrder);
                } catch (error) {
                    await dialogs.alert({message: 'Unable to detect your email apps. Please make sure that you have an email service installed! Using SMS instead.', okButtonText: 'OK'});
                    phone.sms(['+639163601454'], this.orderDetail);
                }
            }
            if (await dialogs.confirm({ message: "Please tap OK if you've already sent your order.", okButtonText: 'OK', cancelButtonText: 'NO' })) {
                let orderCreationResponse = await this._ngFire.createOrderData(this.orderDataService.orderCart, userDetails, this.isReserveOrder, this.userData.uid, timecreated);
                console.dir(orderCreationResponse);
                this.orderDataService.resetOrders();
                this.navigationService.navigateToHome();
            }
        } else {
            dialogs.alert({ message: `${this.orderDataService.orderCart.orderData.length == 0 ? 'You have not placed an order yet!' : 'Your order doesn\'t meet the minimum amount required!'}`, okButtonText: 'OK' });
        }
    }
}