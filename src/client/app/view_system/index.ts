

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ViewsModule} from "./views/index";

import {Application} from "./Application";


@NgModule({
    imports: [
        BrowserModule,
        ViewsModule,
    ],
    declarations: [
        Application
    ],
    providers: [
    ],
    bootstrap: [ Application ]
})
export class AppModule { }


export function initialize():void
{
    
}