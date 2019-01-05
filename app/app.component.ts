import { Component, OnInit } from "@angular/core";

import firebase = require('nativescript-plugin-firebase');
import application = require('tns-core-modules/application');

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {
    activeUsers: number = 0;
    fireStoreActiveUsers: firebase.firestore.DocumentReference;

    constructor() {
        firebase.init({
            persist: true
        });

        application.on(application.resumeEvent, (args) => {
            console.log("App Resume");
            this.foreground();
        });

        application.on(application.suspendEvent, (args) => {
            console.log("App Suspended");
            this.suspended();
        });
    }

    async ngOnInit() {
        // let result = await firebase.firestore.collection('food-outlet').doc('3xS7rLZkunAYrp1JA7jB').get();
        // if (result.exists) {
        //     let foodMenuArray = JSON.parse(JSON.stringify(result.data()));
        //     console.dir(foodMenuArray['combo-ni-ante']);
        //     foodMenuArray.forEach((foodItem: any) => {
        //         this.foodMenuData.push(new FoodMenuData(foodItem.fN, foodItem.fPC, foodItem.fPS, false, foodItem.iA));
        //     });
        // } else {
        //     if (await dialogs.confirm({ message: 'Unable to parse data from remote server! Please try again.', okButtonText: 'OK' })) {
        //         this.setFoodMenuData();
        //     }
        // }
    }

    foreground() {
        this.fireStoreActiveUsers = firebase.firestore.collection('active-users').doc('currentActiveUsers');
        this.fireStoreActiveUsers.get().then(doc => {
            if (doc.exists) {
                let remoteActiveUsers = JSON.parse(JSON.stringify(doc.data()));
                this.activeUsers = remoteActiveUsers.activeUsers;
                this.fireStoreActiveUsers.update({
                    activeUsers: this.activeUsers + 1
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    suspended() {
        this.fireStoreActiveUsers = firebase.firestore.collection('active-users').doc('currentActiveUsers');
        this.fireStoreActiveUsers.get().then(doc => {
            if (doc.exists) {
                let remoteActiveUsers = JSON.parse(JSON.stringify(doc.data()));
                this.activeUsers = remoteActiveUsers.activeUsers;
                this.fireStoreActiveUsers.update({
                    activeUsers: this.activeUsers - 1
                });
            } else {
                console.log("No such document!");
            }
        });
    }
}
