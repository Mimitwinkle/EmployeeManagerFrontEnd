import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  employees!: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
      this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  public onOpenModal(employee: Employee, mode: String): void {
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
    if (mode === 'edit') {
      // ToDo: assign passed employee to editEmployee service
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode === 'delete') {
      // ToDo: assign passed employee to deleteEmployee service
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    // Add button to page & click
    document.getElementById('main-container')?.appendChild(button);
    button.click();
  }

}
