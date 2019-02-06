import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
    exports: [
        CommonModule,
        HeaderComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule
    ],
    declarations: [
        HeaderComponent,
        LoaderComponent
    ]
})
export class SharedModule { }
