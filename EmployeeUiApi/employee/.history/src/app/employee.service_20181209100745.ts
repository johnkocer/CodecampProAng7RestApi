import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  private employeesUrl = "http://localhost:5000/api/Employees";
  constructor(private http: HttpClient) {}

  /** GET employeees from the server */
  search(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl, httpOptions);
  }

  /** GET employee by id. Will 404 if id not found */
  get(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}Employee/${id}`;
    return this.http.get<Employee>(url);
  }

  /* GET employeees whose name contains search term */
  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      // if not search term, return empty employee array.
      return of([]);
    }
    return this.http.get<Employee[]>(
      `${this.employeesUrl}GetEmployeeByName/${term}`
    );
  }

  //////// Save methods //////////

  /** POST: add a new employee to the server */
  post(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl + "Employee", employee, httpOptions);
  }

  /** DELETE: delete the employee from the server */
  delete(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.employeesUrl + "Employee/" + id, httpOptions);
  }

  /** PUT: update the employee on the server */
  put(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.employeesUrl + "Employee/" + employee.id, employee, httpOptions);
  }
}

export class Employee {
  public id: number;
  public name: string;
  public gender: string;
  public departmentId: number;
  public salary: number;
}
