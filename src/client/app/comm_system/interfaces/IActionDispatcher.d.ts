
declare interface IActionDispatcher extends IEventDispatcher
{
    registerAction(actionName:string,handler:Function,context?:any):void;
    perform(actionName:string, ...argArray: any[]):Promise<any>;
    unregisterAction(actionName:string,handler:Function):void;
    hasAction(actionName:string):boolean;
}