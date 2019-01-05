import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ProfileComponent } from "./views/profile/profile.component";
import { OrderComponent } from "./views/order/order.component";
import { OrderReviewComponent } from "./views/order-review/order-review.component";
import { HomeComponent } from "./views/home/home.component";
import { FoodOutletComponent } from "./views/food-outlet/food-outlet.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";

const routes: Routes = [
    { path: "", redirectTo: "/dashboard", pathMatch: "full" },
    { path: "dashboard", component: DashboardComponent },
    { path: "homePage", component: HomeComponent },
    { path: "foodOutletPage", component: FoodOutletComponent },
    { path: "profilePage", component: ProfileComponent },
    { path: "orderPage", component: OrderComponent },
    { path: "profile", component: OrderReviewComponent },
];

export const NavigatableComponents = [
    DashboardComponent,
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