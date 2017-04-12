

import {HttpClient} from "./HttpClient";
import {ActionDispatcher} from "./ActionDispatcher";


export const httpClient:IHttpClient = new HttpClient();
export const actionDispatcher:IActionDispatcher = new ActionDispatcher();



export function initialize():void
{
}



//initialize();
