import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule, NavigatableComponents } from "./app.routing";
import { AppComponent } from "./app.component";

import { OrderDataService } from './services/order-data/order-data.service';
import { NavigationService } from './services/navigation/navigation.service';
import { AddOrderModalComponent } from './modals/add-order/add-order';
import { UserDataService } from './services/user-data/user-data.service';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { EmailService } from "~/services/email/email.service";
import { FoodMenuService } from "~/services/food-menu-data/food-menu-data.service";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';
import { SharedModule } from "./shared/shared.module";
import { LoginComponent } from "./views/login/login.component";
import { ModalDialogService } from "nativescript-angular";
import { UIHelperService } from "./services/ui-helper/ui-helper.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        NativeScriptUISideDrawerModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        NavigatableComponents,
        AddOrderModalComponent,
        LoginComponent
    ],
    entryComponents: [
        AddOrderModalComponent,
    ],
    providers: [
        ModalDialogService,
        OrderDataService,
        NavigationService,
        UserDataService,
        EmailService,
        FoodMenuService,
        UIHelperService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
