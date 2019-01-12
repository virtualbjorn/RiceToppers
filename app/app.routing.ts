import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ProfileComponent } from "./views/profile/profile.component";
import { OrderComponent } from "./views/order/order.component";
import { OrderReviewComponent } from "./views/order-review/order-review.component";
import { HomeComponent } from "./views/home/home.component";
import { FoodOutletComponent } from "./views/food-outlet/food-outlet.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { AccountComponent } from "./views/account-and-signup/account.component";
import { SignupComponent } from "./views/account-and-signup/signup.component";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "home", component: HomeComponent },
    { path: "foodOutletPage", component: FoodOutletComponent },
    { path: "profilePage", component: ProfileComponent },
    { path: "orderPage", component: OrderComponent },
    { path: "account", component: AccountComponent },
    { path: "signup", component: SignupComponent },
];

export const NavigatableComponents = [
    DashboardComponent,
    HomeComponent,
    FoodOutletComponent,
    ProfileComponent,
    OrderComponent,
    OrderReviewComponent,
    AccountComponent,
    SignupComponent,
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }