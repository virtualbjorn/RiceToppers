import { Component, OnInit, NgZone } from '@angular/core';
import { OrderDataService } from '~/services/order-data/order-data.service';
import { FirebaseAPIService } from '~/services/firebase-api/firebase-api.service';
import { UserDataService } from '~/services/user-data/user-data.service';
import { OrderHistory } from '~/models/order-data';
import { firestore } from 'nativescript-plugin-firebase';

@Component({
    selector: "app-order-history",
    moduleId: module.id,
    templateUrl: "./order-history.component.html",
    styleUrls: ["./order-history.component.scss"]
})
export class OrderHistoryComponent implements OnInit {
    isOrderHistory: boolean = false;
    constructor(
        private _orderData: OrderDataService,
        private _ngFire: FirebaseAPIService,
        private _user: UserDataService,
        private _ngZone: NgZone
    ) { }

    ngOnInit() {
        this.onSyncOrderHistory();
    }

    async onSyncOrderHistory() {
        this.isOrderHistory = false;
        let orderHistoryResponse: firestore.QuerySnapshot = await this._ngFire.getOrderData(this._user.user.uid);
        this._orderData.orderHistory = [];
        let result = await Promise.all(orderHistoryResponse.docs.map(doc => {
            let data = doc.data();
            data.orderRef.get().then(result => {
                let orderRefData: OrderHistory = result.data();
                this._orderData.orderHistory.push(orderRefData);
            });
        }))
        if (result) {
            this._orderData.orderHistory.sort((a, b) => (a.orderStatus != 'Pending' && b.orderStatus != 'Pending') ? 1 : -1);
            this.isOrderHistory = true;
        }
    }
}