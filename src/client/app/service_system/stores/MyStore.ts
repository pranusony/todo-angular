

import {StoreBase} from "./StoreBase";
import {Actions, EventConstants} from "../constants";

export class MyStore extends StoreBase implements IMyStore
{


    private _sayHiHello: string;


    get sayHiHello(): string {
        return this._sayHiHello;
    }

    protected registerHandlers():void {

        this.registerAction(Actions.SAY_HI_AND_HELLO,this.handleSayHiHello);
    }

    private handleSayHiHello(result:string):string
    {
        this._sayHiHello = result;
        this.dispatchEvent(EventConstants.MyStore.HI_HELLO, result);
        return this._sayHiHello
    }
}