
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {Application} from "./views/Application";
import {HttpModule} from "@angular/http";
import {HttpClient} from "./core/HttpClient";
import {RestClient} from "./core/RestClient";
import {TodoView} from "./views/TodoView";
import {TodoListItemView} from "./views/TodoListItemView";
import {TodoModel} from "./models/TodoModel";

@NgModule({
    imports: [
        HttpModule,
        BrowserModule,
    ],
    declarations: [
        Application,
        TodoView,
        TodoListItemView
    ],
    providers: [
        HttpClient,
        RestClient,
        TodoModel
    ],
    bootstrap: [ Application ]
})
export class AppModule { }