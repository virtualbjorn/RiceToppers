import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, NavigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";

import { OrderDataService } from './services/order-data/order-data.service';
import { NavigationService } from './services/navigation/navigation.service';
import { AddOrderModalComponent } from './modals/add-order/add-order';
import { CartModalComponent } from './modals/cart/cart';
import { UserDataService } from './services/user-data/user-data.service';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EmailService } from "~/services/email/email.service";
import { FoodMenuService } from "~/services/food-menu-data/food-menu-data.service";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        NavigatableComponents,
        AddOrderModalComponent,
        CartModalComponent
    ],
    entryComponents: [
        AddOrderModalComponent,
        CartModalComponent
    ],
    providers: [
        OrderDataService,
        NavigationService,
        UserDataService,
        EmailService,
        FoodMenuService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
