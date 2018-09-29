import { Injectable } from '@angular/core';
import { UserData } from '../../models/user-data';

@Injectable()
export class UserDataService {
    userData: UserData;

    updateUserData(userData: UserData) {
        this.userData = new UserData();
        this.userData = userData;
    }

    get user(): UserData {
        return this.userData;
    }
}