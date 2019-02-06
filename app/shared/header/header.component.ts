import { Component } from "@angular/core";
import { AppComponent } from "~/app.component";

@Component({
    selector: 'app-header',
    moduleId: module.id,
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        public appComponent: AppComponent
    ) { }
}