import { Component, OnInit } from "@angular/core";
import { Todo } from "../todo";
import { TodoService } from "../todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  selectedTodo: Todo;

  public todos: Todo[];
  showEditor = true;
  newTodo: Todo;
  findTodo: Todo;

  constructor(private todoService: TodoService) {
    this.newTodo = new Todo();
    this.findTodo = new Todo();
    this.findTodo.name = "";}

  ngOnInit() {
    this.search();
  }
  onSelect(todo: Todo): void {
    this.selectedTodo = todo;
  }

  getTodoItems() {
    if(this.todos == null) return;
    return this.todos.filter(item => !item.done);
}

reloadTodos(event: any){
  this.search();
}

 search() {
    this.todoService.search().subscribe(
      (data: Todo[]) => {
        this.todos = data.filter(i=>!i.done);
      },
      error => {
        console.log("could not get Todos", error);
        this.todos = null;
      }
    );
  }

  public add(item: Todo) {
    this.todoService.post(this.newTodo).subscribe(
      (data: Todo) => {
        this.todos.push(data);
      },
      error => {
        console.log("oops could not add Todo", error);
      }
    );
  }

  public update(item: Todo) {
    this.todoService.put(item).subscribe(
      todo => {
        this.search();
      },
      error => {
        console.log("oops could not update Todo", error);
      }
    );
  }

  public delete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(
      data => {
        console.log("Todo deleted");
        this.search();
      },
      error => {
        console.log("oops could not delete Todo", error);
      }
    );
  }

  get() {
    this.todoService.get(this.findTodo.id).subscribe(
      e => {
        if (e == null) {
          let todoFind = new Todo();
          todoFind.id = this.findTodo.id;
          this.findTodo = todoFind;
        } else if (e != undefined) {
          this.findTodo = e;
        }
      },
      error => {
        this.findTodo = new Todo();
        console.log("could not get Todo", error);
      }
    );
  }
}
