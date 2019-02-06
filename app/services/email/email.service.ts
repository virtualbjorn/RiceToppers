import { Injectable } from '@angular/core';
import * as application from 'application';

@Injectable()
export class EmailService {
    private androidIntent = android.content.Intent;
    private email: string[] = ['virtualbjorn.developer@gmail.com'];

    constructor() {
    }

    checkEmailAvailability() {
        let uri = android.net.Uri.fromParts("mailto", "", null);
        let intent = new this.androidIntent(this.androidIntent.ACTION_SENDTO, uri);
        let packageManager = application.android.context.getPackageManager();
        let nrOfMailApps = packageManager.queryIntentActivities(intent, 0).size();
        return nrOfMailApps;
    }

    compose(orderDetails: string, orderID: string, isReserveOrder) {
        try {
            let mail = new this.androidIntent(this.androidIntent.ACTION_SENDTO);
            mail.putExtra(this.androidIntent.EXTRA_TEXT, orderDetails);
            mail.setType('text/plain');
            mail.putExtra(this.androidIntent.EXTRA_SUBJECT, `RiceToppers OrderID ${orderID} - For ${isReserveOrder ? 'Reservation' : 'Delivery'}`)
            mail.putExtra(this.androidIntent.EXTRA_EMAIL, this.toStringArray(this.email));

            mail.setData(android.net.Uri.parse('mailto:'));
            mail.setFlags(this.androidIntent.FLAG_ACTIVITY_NEW_TASK);
            application.android.context.startActivity(mail);
        } catch (error) {
            throw error;
        }
    }
    toStringArray(args) {
        let arr = java.lang.reflect.Array.newInstance(java.lang.String.class, args.length);
        for (let i = 0; i < args.length; i++) {
            arr[i] = args[i];
        }
        return arr;
    };
}