
import {Component} from "@angular/core";
import {TodoModel} from "../models/TodoModel";
import {TodoItem} from "../models/TodoItem";

@Component({
    selector: "todo-view",
    template:`<header class ="header">
            <h1>todos</h1>
            <input  (keyup)="handleTodoEntered($event)"  class="new-todo" placeholder="what needs to be done?" autofocus >
        </header>
        <section class="main">
            <input (click)="handleToggleAllClicked($event)" type="checkbox" class="toggle-all" [hidden]="todoModel.todoItems.length === 0" >
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
            <todo-list-item-view *ngFor="let todoItem of todoModel.todoItems" [filterType]="filterType" [todoItem]="todoItem"></todo-list-item-view>
</ul>
        </section>
        <footer class="footer" [hidden]="todoModel.todoItems.length === 0">
            <span class="todo-count">{{todoModel.activeTodoItemsCount}} items Left</span>
            <ul class="filters">
                <li>
                    <a href="#/" (click)="handleFilterItems('all')" [class.selected]="filterType == 'all'" id="all">All</a>
                </li>
                <li>
                    <a href="#/" (click)="handleFilterItems('active')" [class.selected]="filterType == 'active'" id="active">Active</a>
                </li>
                <li>
                    <a href="#/" (click)="handleFilterItems('completed')"[class.selected]="filterType == 'completed'" id="completed">Completed</a>
                </li>
            </ul>
            <button (click)="handleClearCompleted()" [hidden]="todoModel.completedTodoItemsCount <= 0" class="clear-completed">Clear completed</button>
        </footer>`
})
export class TodoView {

    todoModel:TodoModel;
    todoItems:TodoItem[];

    filterType:string = 'all';

    constructor (todoModel:TodoModel) {
        this.todoModel = todoModel;
        this.todoItems = this.todoModel.todoItems;
    }

    handleToggleAllClicked(event:MouseEvent):void {
        this.todoModel.markAllCompleted((event.target as HTMLInputElement).checked)
    }
    handleTodoEntered(e:KeyboardEvent):void {
        var key = e.keyCode || e.which;
        if (key == 13) {
            this.todoModel.addTodo((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
        }
    }

    handleClearCompleted():void {
        this.todoModel.removeAllCompleted();
    }

    handleFilterItems(filterType:string):void {
        this.filterType = filterType;

    }
}