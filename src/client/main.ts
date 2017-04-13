
import "reflect-metadata";
import "rxjs";
import "zone.js"; // required by angular

import {AppModule} from "./AppModule";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic().bootstrapModule(AppModule);
