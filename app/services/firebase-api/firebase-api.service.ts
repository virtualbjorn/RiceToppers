import { Injectable } from "@angular/core";
import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class FirebaseApiService {
    constructor() {
        firebase.init({
            persist: true
        })
    }
}