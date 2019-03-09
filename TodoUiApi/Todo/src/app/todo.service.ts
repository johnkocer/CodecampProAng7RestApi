import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { Todo } from "./todo";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private url = "http://localhost:5000/api/" + "todos/";
  constructor(private http: HttpClient) {}

  /** GET Todoes from the server */
  search(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url , httpOptions);
  }

  /** GET Todo by id. Will 404 if id not found */
  get(id: number): Observable<Todo> {
    const url = `${this.url}${id}`;
    return this.http.get<Todo>(url);
  }

  /* GET Todoes whose name contains search term */
  searchTodos(term: string): Observable<Todo[]> {
    if (!term.trim()) {
      // if not search term, return empty Todo array.
      return of([]);
    }
    return this.http.get<Todo[]>(
      `${this.url}GetTodoByName/${term}`
    );
  }

  //////// Save methods //////////

  /** POST: add a new Todo to the server */
  post(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url, todo, httpOptions);
  }

  /** DELETE: delete the Todo from the server */
  delete(id: number): Observable<Todo> {
    return this.http.delete<Todo>(this.url + id, httpOptions);
  }

  /** PUT: update the Todo on the server */
  put(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.url  + todo.id, todo, httpOptions);
  }
}
