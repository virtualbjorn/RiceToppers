import { RouterExtensions } from 'nativescript-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationService {
  constructor(private _routerExt: RouterExtensions) { }

  private DURATION_TIME = 250;

  goBack() {
    this._routerExt.back();
  }

  navigateTo(navigateToUrl: string) {
    this._routerExt.navigate([`/${navigateToUrl}`], {
      clearHistory: true, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToOrderList() {
    this._routerExt.navigate(["/order-list"], {
      clearHistory: false, animated: true, transition: {
        name: "slideLeft",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToHome() {
    this._routerExt.navigate(["/home"], {
      clearHistory: true, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToFoodOutlet() {
    this._routerExt.navigate(["/food-outlet"], {
      clearHistory: true, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToAccount() {
    this._routerExt.navigate(["/account"], {
      clearHistory: false, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToSignUp() {
    this._routerExt.navigate(["/signup"], {
      clearHistory: false, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToLogin() {
    this._routerExt.navigate(["/login"], {
      clearHistory: true, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToOrderHistory() {
    this._routerExt.navigate(["/order-history"], {
      clearHistory: false, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }
}