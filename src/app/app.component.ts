import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  employees: Employee[] = [];
  editEmployee: Employee | undefined;
  deleteEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

  public onOpenModal(mode: String, employee?: Employee): void {
    // Create invisible button which will open the appropriate modal
    const button = document.createElement('button');
    // Override default type="submit"
    button.type = 'button';
    button.style.display = 'none';
    // Set correct modal depending on which mode was passed
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else if (mode === 'delete') {
      // ToDo: assign passed employee to deleteEmployee service
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // Add button to page & click
    document.getElementById('main-container')?.appendChild(button);
    button.click();
  }

  public onAddEmployee(form: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(form.value).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
        form.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        form.reset();
      }
    })
  }

  public onUpdateEmployee(employee: Employee): void {
    //document.getElementById('edit-employee-form')?.click();
    this.employeeService.updateEmployee(employee).subscribe({
      next: (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    })
  }

}
