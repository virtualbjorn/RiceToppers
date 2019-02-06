import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { OrderListComponent } from "./views/order/order-list.component";
import { OrderReviewComponent } from "./views/order-review/order-review.component";
import { HomeComponent } from "./views/home/home.component";
import { FoodOutletComponent } from "./views/food-outlet/food-outlet.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { AccountComponent } from "./views/account/account.component";
import { SignUpComponent } from "./views/signup/signup.component";
import { LoginComponent } from "./views/login/login.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "home", component: HomeComponent },
    { path: "foodOutletPage", component: FoodOutletComponent },
    { path: "order-list", component: OrderListComponent },
    { path: "account", component: AccountComponent },
    { path: "signup", component: SignUpComponent },
    { path: "login", component: LoginComponent }
];

export const NavigatableComponents = [
    DashboardComponent,
    HomeComponent,
    FoodOutletComponent,
    OrderListComponent,
    OrderReviewComponent,
    AccountComponent,
    SignUpComponent,
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }