import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ProfileComponent } from "./views/profile/profile.component";
import { OrderComponent } from "./views/order/order.component";
import { OrderReviewComponent } from "./views/order-review/order-review.component";

const routes: Routes = [
    { path: "", redirectTo: "/profilePage", pathMatch: "full" },
    { path: "profilePage", component: ProfileComponent },
    { path: "orderPage", component: OrderComponent },
    { path: "profile", component: OrderReviewComponent },
];

export const NavigatableComponents = [
    ProfileComponent,
    OrderComponent,
    OrderReviewComponent
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }