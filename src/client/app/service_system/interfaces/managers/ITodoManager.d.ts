

declare interface ITodoManager
{
    loadTodos():void;
    applyTodoFilter(filter:string):void;
    addTodo(label:string):void;
    deleteTodo(item:ITodoItem):void;
    editTODOItem(item:ITodoItem, value:string):void;
    toggleTODOItemCompleted(item:ITodoItem, completed:boolean):void;
    toggleAllItemsCompleted(value:boolean):void;
    clearAllCompleted():void;
}