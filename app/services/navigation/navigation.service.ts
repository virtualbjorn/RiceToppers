import { RouterExtensions } from 'nativescript-angular';
import { Injectable } from "@angular/core";

@Injectable()
export class NavigationService {
  constructor(private _routerExt: RouterExtensions) { }

  private DURATION_TIME = 250;

  goBack() {
    this._routerExt.backToPreviousPage();
  }

  // navigateToPage(navigateToPage: string, clearHistory: boolean, transitions: string) {
  //   this._routerExt.navigate([`/${navigateToPage}`], {
  //     clearHistory: clearHistory, animated: true, transition: {
  //       name: transitions,
  //       duration: this.DURATION_TIME,
  //       curve: "linear"
  //     }
  //   });
  // }

  navigateToOrderPage() {
    this._routerExt.navigate(["/orderPage"], {
      clearHistory: false, animated: true, transition: {
        name: "slideLeft",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }

  navigateToProfilePage() {
    this._routerExt.navigate(["/profilePage"], {
      clearHistory: true, animated: true, transition: {
        name: "fade",
        duration: this.DURATION_TIME,
        curve: "linear"
      }
    });
  }
}