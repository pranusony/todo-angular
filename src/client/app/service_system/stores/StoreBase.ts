

import {EventDispatcher} from "../../comm_system/EventDispatcher";
import {actionDispatcher} from "../../comm_system/index";

export abstract class StoreBase extends EventDispatcher implements IStore
{
    protected actionDispatcher:IActionDispatcher = actionDispatcher;
    
    constructor(){
        super();
        this.registerHandlers();
    }
    
    protected abstract registerHandlers():void;
    
    protected registerAction(actionName:string, handler:(...args:any[])=>any):void
    {
        this.actionDispatcher.registerAction(actionName,handler,this);
    }
}