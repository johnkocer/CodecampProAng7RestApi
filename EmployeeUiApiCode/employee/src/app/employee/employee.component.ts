import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  public employeeList: Employee[];
  showEditor = true;
  myName: string;
  newEmployee: Employee;
  findEmployee: Employee;

  constructor(private dataService: EmployeeService) {
    this.newEmployee = new Employee();
    this.findEmployee = new Employee();
    this.findEmployee.name = "";
  }

  // if you want to debug info  just uncomment the console.log lines.
  ngOnInit() {
    //    console.log("in ngOnInit");
    //this.employeeList = this.dataService.employeeList;
    this.getAll();
  }

  employeeSeach() {
    console.log("In employeeSearch ");
    if (!this.findEmployee.name.trim()) return;

    this.dataService.searchEmployees(this.findEmployee.name).subscribe(
      (data: Employee[]) => {
        console.log("found employees");
        console.log(JSON.stringify(data));
        this.employeeList = data;
      },
      error => {
        console.log("could not get Employees", error);
        this.employeeList = null;
      }
    );
  }
  getAll() {
    console.log("IngetAll ");
    this.dataService.getAll().subscribe(
      (data: Employee[]) => {
        console.log("found employees" + data);
        this.employeeList = data;
      },
      error => {
        console.log("could not get Employees", error);
        this.employeeList = null;
      }
    );
  }

  public addEmployee(item: Employee) {
    //console.dir(item);
    //console.log("In addEmployee: " + this.newEmployee);
    this.dataService.addEmployee(this.newEmployee).subscribe(
      (data: Employee) => {
        console.log("employee added" + data);
       this.employeeList.push(data);
      },
      error => {
        console.log('oops could not add employee', error);
      });
  }

  public updateEmployee(item: Employee) {
    console.dir(item);
    // console.log("In updateEmployee: " + item);
    this.dataService.updateEmployee(item).subscribe(employee => {
      // this.employeeList.push(employee);
      console.dir(employee);
      this.getAll();
    },
    error => {
      console.log('oops could not update employee', error);
    });
    //    console.log("in updateEmployee:" );
  }

  public deleteEmployee(employee: Employee) {
    console.log( "in deleteEmployee: " + employee.id);
    // this.dataService.deleteEmpoloyee(employeeId);

    this.dataService.deleteEmpoloyee(employee.id).subscribe(
      data => {
        console.log("employee deleted");
        this.getAll();
      },
      error => {
        console.log('oops could not delete employee', error);
      });
  }

  findEmployeeById() {
    this.getEmployeeById();
  }

  getEmployeeById() {
    this.dataService.getEmployee(this.findEmployee.id).subscribe(
      e => {
        if(e == null) {
          let employeeFind = new Employee();
          employeeFind.id=this.findEmployee.id;
          this.findEmployee = employeeFind; }
        else if (e != undefined) {this.findEmployee = e; }
      },
      error => {
        this.findEmployee = new Employee();
        console.log("could not get Employee", error);
      }
    );
  }
}

export class Employee {
  public id: number;
  public name: string;
  public gender: string;
  public departmentId: number;
  public salary: number;
}
