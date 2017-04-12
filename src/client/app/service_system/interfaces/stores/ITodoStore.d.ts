

declare interface ITodoStore
{
    todos:ITodoItem[];
    itemsLeftToComplete:number;
    hasTodos:boolean;
    hasCompletedItems:boolean;
}