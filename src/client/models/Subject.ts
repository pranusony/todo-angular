
export class Subject {

     _eventHandlersMap;

    constructor() {
        this._eventHandlersMap = {};
    }

    subscribe(eventName, handlerFunction,thisContext) {

        if(!this._eventHandlersMap[eventName])
            this._eventHandlersMap[eventName] = [];

        this._eventHandlersMap[eventName].push(handlerFunction.bind(thisContext));
    };

    publish(eventName, data) {

        var handlerFunctions = this._eventHandlersMap[eventName];

        if(handlerFunctions) {

            handlerFunctions.forEach(function (handlerFunction) {

                handlerFunction(data);

            })
        }
    };
}