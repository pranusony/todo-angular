
import {Component, Input} from "@angular/core";
import {TodoModel} from "../models/TodoModel";
import {TodoItem} from "../models/TodoItem";


@Component({
    selector: "todo-list-item-view",
    template:`<li [hidden]="hidden" [class.completed]="todoItem.completed">
                <div class="view">
                    <input (click)="handleToggleTodoItem($event)" type="checkbox" class="toggle" [checked]="todoItem.completed">
                    <label> {{todoItem.description}} </label>
                    <button (click)="handleRemoveTodoItem()" class="destroy"> </button>
                </div>
                <input class = "edit">
            </li>`
})
export class TodoListItemView {

    @Input()
    todoItem:TodoItem;


    _filterType:string;

    @Input()
    set filterType(value:string) {
        this._filterType = value;
        this.setHidden();
    };

    hidden = false;

    todoModel:TodoModel;

    constructor(todoModel:TodoModel) {
        this.todoModel = todoModel;
    }

    handleRemoveTodoItem():void {
        this.todoModel.removeTodo(this.todoItem);
    }

    handleToggleTodoItem(event:MouseEvent):void {
        this.todoModel.markTodoCompleted((event.target as HTMLInputElement).checked, this.todoItem);
    }

    setHidden():void {
        if((this._filterType === "active" && this.todoItem.completed) || (this._filterType === "completed" && !this.todoItem.completed)) {
            this.hidden = true;
        }
        else {
            this.hidden = false;
        }
    }

}