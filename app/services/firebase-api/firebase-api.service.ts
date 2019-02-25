import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";
import * as fs from 'file-system';
import { UploadFileResult } from "nativescript-plugin-firebase/storage/storage";
import * as connectivity from 'connectivity';
import * as moment from 'moment';
import { OrderCart } from "~/models/order-cart";

@Injectable()
export class FirebaseAPIService {
    constructor() {
        firebase.init({
            persist: true
        })
    }

    createUser(email: string, password: string): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            firebase.createUser({
                email: email,
                password: password
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    createUserData(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.firestore.collection(user.accountType).doc(user.uid).set(user).then(() => {
                resolve({ success: true });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    uploadFile(selectedImagePath: string, uid: string): Promise<UploadFileResult> {
        return new Promise((resolve, reject) => {
            firebase.storage.uploadFile({
                remoteFullPath: `user-profile-images/${uid}.png`,
                localFile: fs.File.fromPath(selectedImagePath),
                onProgress: (status) => {
                    console.log("Uploaded fraction: " + status.fractionCompleted);
                    console.log("Percentage complete: " + status.percentageCompleted);
                }
            }).then((response) => {
                this.getDownloadURL(uid);
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getDownloadURL(uid: string): Promise<string> {
        return new Promise((resolve, reject) => {
            firebase.storage.getDownloadUrl({
                remoteFullPath: `profile-images/${uid}.png`
            }).then((response) => {
                firebase.firestore.collection('customer').doc(uid).update({ imageUrl: response });
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    authenticateUser(email: string, password: string): Promise<firebase.User> {
        return new Promise((resolve, reject) => {
            firebase.login({
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: email,
                    password: password
                }
            }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getUserData(user: any): Promise<firebase.firestore.DocumentSnapshot> {
        return new Promise((resolve, reject) => {
            firebase.firestore.collection(user.accountType).doc(user.uid).get()
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                });
        });
    }

    updateUserData(user: any): Promise<any> {
        return new Promise((resolve, reject) => {
            firebase.firestore.collection(user.accountType).doc(user.uid).update({
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                contactNo: user.contactNo,
                address: user.address
            }).then(() => {
                resolve({ success: true, message: 'Successfully Updated User Data' });
            }).catch((error) => {
                reject(error);
            });
        });
    }

    createOrderData(orderCart: OrderCart, userData: any, isReserveOrder: boolean, uid: string, timecreated: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let customerRef = firebase.firestore.collection('customer').doc(uid);
            let orderRef = firebase.firestore.collection('orders').doc()
            let createBatch = firebase.firestore.batch();
            createBatch.set(orderRef, {
                userData: userData,
                orderData: orderCart.orderData,
                totalAmountPayable: orderCart.totalAmountPayable,
                orderType: isReserveOrder ? 'For Reservation' : 'For Delivery',
                customerRef: customerRef,
                orderStatus: 'Pending',
                id: orderRef.id,
                timecreated: timecreated
            });
            createBatch.set(customerRef.collection('orders').doc(), { orderRef: orderRef }, { merge: true });
            createBatch.commit()
                .then(() => {
                    resolve({ success: true, message: 'Successfully created order.' });
                }).catch(error => {
                    reject(error);
                });
        });
    }

    async getOrderData(uid: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                let orderCollection = await firebase.firestore.collection('customer').doc(uid).collection('orders').get();
                resolve(orderCollection);
            } catch (error) {
                reject(error);
            }
        });
    }

    getOrderDetails(docRef: firebase.firestore.DocumentReference): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {

            } catch (error) {

            }
        });
    }

    checkForConnectivity(): boolean {
        return connectivity.getConnectionType() > 0;
    }
}