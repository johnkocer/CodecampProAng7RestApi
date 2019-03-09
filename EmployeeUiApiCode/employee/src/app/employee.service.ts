import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //private employeesUrl = 'api/employees';  // URL to web api
  private employeesUrl = 'http://localhost:5000/api/';
  constructor(
    private http: HttpClient,
    // private messageService: MessageService
  ) { }

  /** GET employeees from the server */
  getAll (): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl + 'GetEmployees', httpOptions)
      .pipe(
        //tap(employeees => this.log('fetched employeees')),
         catchError(this.handleError('getemployees', []))
      )      ;
  }

  /** GET employee by id. Return `undefined` when id not found */
  getEmployeeNo404<Data>(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}getEmployee/${id}`;
    return this.http.get<Employee>(url);
  }

  /** GET employee by id. Will 404 if id not found */
  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}getEmployee/${id}`;
    return this.http.get<Employee>(url);
  }

  /* GET employeees whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(`${this.employeesUrl}GetEmployeeByName/${term}`);

  }

  //////// Save methods //////////

  /** POST: add a new employee to the server */
  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl + "AddEmployee", employee, httpOptions);
  }

  /** DELETE: delete the employee from the server */
  deleteEmpoloyee (id: number): Observable<Employee> {
    // const id = typeof employee === 'number' ? employee : employee.id;
    // const url = `${this.employeesUrl}/${id}`;

    return this.http.delete<Employee>(
      this.employeesUrl + "DeleteEmployee/" + id, httpOptions );
  }

  /** PUT: update the employee on the server */
  updateEmployee (employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(
      this.employeesUrl + "UpdateEmployee/" + employee.id, employee, httpOptions  );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // /** Log a employeeService message with the MessageService */
  // private log(message: string) {
  //   this.messageService.add(`employeeService: ${message}`);
  // }
}

export class Employee {
  public id: number;
  public name: string;
  public gender: string;
  public departmentId: number;
  public salary: number;
}
