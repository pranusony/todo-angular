import {Subject} from "./Subject"
import {TodoItem} from "./TodoItem";
import {ModelEvents} from "../constants/constants"

export class TodoModel {
    
    _subject;
    _activeTodoItemsCount;

    completedTodoItemsCount;
    todoItems;

    get activeTodoItemsCount() {
        return this._activeTodoItemsCount;
    }

    set activeTodoItemsCount(value){
        this._activeTodoItemsCount = value;
        this._subject.publish(ModelEvents. ACTIVE_TODOITEMS_CHANGED);
    }

    constructor(){
        this._subject = new Subject();
        this._activeTodoItemsCount = 0;

        this.completedTodoItemsCount = 0;
        this.todoItems = [];
    }

    //add methods below

    addTodo(description) {
        var toDoItem = new TodoItem();
        toDoItem.description = description;
        this.todoItems.push(toDoItem);
        this.activeTodoItemsCount++;
        this._subject.publish(ModelEvents.TODO_ADDED, toDoItem);
        this._subject.publish(ModelEvents.TODO_ITEMS_CHANGED, this.todoItems);
    };

    removeTodo(todoItem) {
        var index = this.todoItems.indexOf(todoItem);
        if (index > -1)
            this.todoItems.splice(index, 1);
            this._subject.publish(ModelEvents.TODO_ITEMS_CHANGED, this.todoItems);
        if(todoItem.completed ){
            this.completedTodoItemsCount--;
            this._subject.publish(ModelEvents. COMPLETED_ITEMS_CHANGED);

        }
        else
            this.activeTodoItemsCount--;
        this._subject.publish(ModelEvents.TODO_REMOVED, todoItem);
    };

    markAllCompleted(toggleAll) {
        for (var i = 0; i < this.todoItems.length; i++) {
            this.todoItems[i].completed = toggleAll;
        }
        if(toggleAll){
            this.completedTodoItemsCount = this.todoItems.length;
            this._subject.publish(ModelEvents.COMPLETED_ITEMS_CHANGED);
            this.activeTodoItemsCount = 0;
        }
        else{
            this.completedTodoItemsCount = 0;
            this._subject.publish(ModelEvents.COMPLETED_ITEMS_CHANGED);
            this.activeTodoItemsCount = this.todoItems.length;
        }
        this._subject.publish(ModelEvents.MARK_ALL_COMPLETED, this.todoItems);
    };

    removeAllCompleted(){
        var removedItems = [];
        for (var i = this.todoItems.length - 1; i >= 0; i--) {
            if (this.todoItems[i].completed) {
                var todoItem = this.todoItems[i];
                this.todoItems.splice(i, 1);
                removedItems.push(todoItem);
            }
        }
        this.completedTodoItemsCount =0;
        this._subject.publish(ModelEvents.COMPLETED_ITEMS_CHANGED);
        this._subject.publish(ModelEvents.REMOVE_ALL_COMPLETED,removedItems);
        this._subject.publish(ModelEvents.TODO_ITEMS_CHANGED, this.todoItems);
    };

    markTodoCompleted(toggle, todoItem) {
        todoItem.completed = toggle;
        if(toggle){
            this.completedTodoItemsCount++;
            this._subject.publish(ModelEvents.COMPLETED_ITEMS_CHANGED);
            this.activeTodoItemsCount--;
        }
        else{
            this.completedTodoItemsCount--;
            this._subject.publish(ModelEvents.COMPLETED_ITEMS_CHANGED);
            this.activeTodoItemsCount++;
        }
        this._subject.publish(ModelEvents.MARK_TODO_COMPLETED, todoItem);

    };

    editTodo(todoItem, newDescription) {

        todoItem.description = newDescription;
        if(!todoItem.description){
            this.removeTodo(todoItem);
        }
        this._subject.publish(ModelEvents.TODO_EDITED, todoItem);
    };

    subscribe(eventName, handler, thisContext) {

        this._subject.subscribe(eventName, handler, thisContext);
    }

}