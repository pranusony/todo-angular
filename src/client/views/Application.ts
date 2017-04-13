
import {Component} from "@angular/core";


@Component({
    selector: "app",
    template:`<section class="todoapp">
                <todo-view></todo-view>
               </section>

                <footer class ="info">
                    <p>Double-click to edit a todo</p>
                    <p>Created by <a href="http://twitter.com/oscargodson">Oscar Godson</a></p>
                    <p>Refactored by <a href="https://github.com/cburgmer">Christoph Burgmer</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>`
})
export class Application {}