import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ProfileComponent } from "./views/profile/profile.component";
import { OrderComponent } from "./views/order/order.component";
import { OrderReviewComponent } from "./views/order-review/order-review.component";
import { HomeComponent } from "./views/home/home.component";
import { FoodOutletComponent } from "./views/food-outlet/food-outlet.component";

const routes: Routes = [
    { path: "", redirectTo: "/homePage", pathMatch: "full" },
    { path: "homePage", component: HomeComponent },
    { path: "foodOutletPage", component: FoodOutletComponent },
    { path: "profilePage", component: ProfileComponent },
    { path: "orderPage", component: OrderComponent },
    { path: "profile", component: OrderReviewComponent },
];

export const NavigatableComponents = [
    HomeComponent,
    FoodOutletComponent,
    ProfileComponent,
    OrderComponent,
    OrderReviewComponent
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }