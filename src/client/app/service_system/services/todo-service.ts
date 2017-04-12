

import {getFromStore, store} from "./cache-service";


export function getTODOs():Promise<ITodoItem[]>
{
    var items:Array<any>;

    items = getFromStore("todos-angular") || [];
    
    return Promise.resolve(items);
}

export function saveTODOs(todos:ITodoItem[]):Promise<ITodoItem[]>
{
    var items:Array<any>;

    store("todos-angular", todos);


    return Promise.resolve(getFromStore("todos-angular"));
}