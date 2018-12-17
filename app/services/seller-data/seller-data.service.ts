import { Injectable } from '@angular/core';
import { Seller } from '../../models/seller-data';
import { localStorage } from '~/main';

@Injectable()
export class SellerDataService {
    private sellerData: Seller;

    updateSellerData(sellerData: Seller) {
        this.sellerData = sellerData;
        localStorage.setItemObject('Seller Data', this.sellerData);
    }

    get isSellerData(): boolean {
        return localStorage.getItem('Seller Data') ? true : false;
    }

    get userDetails(): Seller {
        return this.sellerData;
    }

    get user(): Seller {
        this.sellerData = localStorage.getItem('Seller Data');
        return this.sellerData;
    }
}