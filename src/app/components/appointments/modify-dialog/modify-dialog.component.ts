import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { Employee, ModifyDialogData } from 'src/app/interface';
import { Appointment } from 'src/app/model/appointment';
import { Customer } from 'src/app/model/customer';
import { AppointmentService } from 'src/app/service/appointment.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.scss']
})
export class ModifyDialogComponent {

  employee: Employee;
  employees: Employee[];
  customer: Customer;
  customers: Customer[];
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  startDateTime: Date;
  endDateTime: Date;
  startDateTimeString: string;
  endDateTimeString: string;
  appointmentTitle: string;
  valid: boolean;
  appointmentId: number;

  constructor(public dialogRef: MatDialogRef<ModifyDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Appointment,  
    private appointmentService: AppointmentService,
    private employeeService: EmployeeService, 
    private customerService: CustomerService) { 
   //SETTING EMPLOYEE LIST AND SELECTED EMPLOYEE
    this.employeeService.getAllEmployees().subscribe(result => {
      this.employees = result;
      this.employees.forEach(e =>{
        if(e.employeeId == data.employeeId){
          this.employee = e;
        }
      })
    })

    //SETTTING CUSTOMER LIST AND SELECTED CUSTOMER
    this.customerService.getAllCustomers().subscribe(result => {
      this.customers = result;
      this.customers.forEach(c => {
        if(c.customerId == data.customerId){
          this.customer = c;
        }
      })
    })
    
    //SETTING START DATE/TIME
    this.startDate = new Date(data.startDate);
    this.startTime = data.startTime;
    this.startDateTimeString = data.startDate + "T" + data.startTime;
    this.startDateTime = new Date(this.startDateTimeString)

    //SETTTING END DATE/TIME
    this.endDate = new Date(data.endDate);
    this.endTime = data.endTime;
    this.endDateTimeString = data.endDate + "T" + data.endTime;
    this.endDateTime = new Date(this.endDateTimeString)

    //SETTING TITLE
    this.appointmentTitle = data.title;
    this.appointmentId = data.appointmentId;

  }

  onNoClick(): void {
    this.dialogRef.close("No Click");
  }

  updateAppointment(){
    let startDate = this.startDateTimeString.split('T')[0]
    let startTime = this.startDateTimeString.split('T')[1]
    let endDate = this.endDateTimeString.split('T')[0]
    let endTime = this.endDateTimeString.split('T')[1]

    let newAppointment = new Appointment;
    newAppointment.title = this.appointmentTitle;
    newAppointment.customerId = this.customer.customerId;
    newAppointment.employeeId = this.employee.employeeId;
    newAppointment.startDate = startDate;
    newAppointment.startTime = startTime;
    newAppointment.endDate = endDate;
    newAppointment.endTime = endTime;
    newAppointment.lastUpdated = new Date();
    this.appointmentService.updateAppointment(this.appointmentId, newAppointment).subscribe(response =>{
      if(response == "Success"){
        this.dialogRef.close(response)
      }
    });
  }

  validateAppointment(){
    if(this.startDateTime > this.endDateTime){
      window.alert('Appointment Start Date/Time cannot be after End Date/Time')
      this.valid = false;
    }else{
      this.valid = true;
    }
  
  }
}
