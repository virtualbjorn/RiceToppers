import { Component, NgZone } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Page, EventData } from 'ui/page';
import { OrderData } from '../../models/order-data';
import { OrderDataService } from '../../services/order-data/order-data.service';

@Component({
    moduleId: module.id,
    templateUrl: './add-order.html',
    styleUrls: ['./add-order.scss']
})

export class AddOrderModalComponent {
    selectedProductData: OrderData;
    selectedProductName: string;
    constructor(
        private params: ModalDialogParams,
        private page: Page,
        private ngZone: NgZone,
        public orderDataService: OrderDataService
    ) {
        this.selectedProductName = params.context;
        this.fetchProductData();
        page.on('unloaded', () => {
            this.params.closeCallback();
        });
    }

    async fetchProductData() {
        this.selectedProductData = await this.orderDataService.getProductData(this.selectedProductName);
        this.selectedProductData.piecesToOrder = this.selectedProductData.piecesToOrder || 1;
    }

    updatePrice() {
        this.ngZone.run(()=> {
            this.selectedProductData.totalPrice = this.selectedProductData.productPrice * this.selectedProductData.piecesToOrder;
        });
    }

    updatePiecesToOrder(updatePcs: string) {
        updatePcs == '+' ? ++this.selectedProductData.piecesToOrder : --this.selectedProductData.piecesToOrder;
    }

    addOrder() {
        this.orderDataService.addOrder(this.selectedProductData);
        this.params.closeCallback();
    }

    onCancelButtonTap() {
        this.params.closeCallback();
    }
}