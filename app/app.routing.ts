import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { OrderListComponent } from "./views/order/order-list.component";
import { HomeComponent } from "./views/home/home.component";
import { FoodOutletComponent } from "./views/food-outlet/food-outlet.component";
import { AccountComponent } from "./views/account/account.component";
import { SignUpComponent } from "./views/signup/signup.component";
import { LoginComponent } from "./views/login/login.component";
import { OrderHistoryComponent } from "./views/order-history/order-history.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "foodOutletPage", component: FoodOutletComponent },
    { path: "order-list", component: OrderListComponent },
    { path: "order-history", component: OrderHistoryComponent },
    { path: "account", component: AccountComponent },
    { path: "signup", component: SignUpComponent },
    { path: "login", component: LoginComponent }
];

export const NavigatableComponents = [
    HomeComponent,
    FoodOutletComponent,
    OrderListComponent,
    OrderHistoryComponent,
    AccountComponent,
    SignUpComponent,
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }