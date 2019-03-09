import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {
  @Output() reloadTodos = new EventEmitter<Todo>();
  @Input() todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  public update(item: Todo) {
    this.todoService.put(item).subscribe(
      todo => {
        this.reloadTodos.emit(todo);
      },
      error => {
        console.log('oops could not update Todo', error);
      }
    );
  }

  public delete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(
      data => {
        console.log('Todo deleted');
       this.reloadTodos.emit(todo);
      },
      error => {
        console.log('oops could not delete Todo', error);
      }
    );
  }
}
