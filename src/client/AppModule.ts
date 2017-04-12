
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Application} from "./views/Application";
import {HttpModule} from "@angular/http";
import {HttpClient} from "./core/HttpClient";
import {RestClient} from "./core/RestClient";

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
    ],
    declarations: [
        Application,
    ],
    providers: [
        HttpClient,
        RestClient],
    bootstrap: [ Application ]
})
export class AppModule { }