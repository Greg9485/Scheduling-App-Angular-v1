import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyDialogComponent } from '../modify-dialog/modify-dialog.component';
import { Appointment } from 'src/app/model/appointment';
import { Employee } from 'src/app/interface';
import { Customer } from 'src/app/model/customer';
import { AppointmentService } from 'src/app/service/appointment.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  //userId: number;
  appointmentTitle: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  employees: Employee[];
  employee: Employee;
  employeeName: string;
  customers: Customer[];
  customer: Customer;
  cust: string;
  startDateTime: Date;
  endDateTime: Date;
  valid: boolean = false;

  constructor(public dialogRef: MatDialogRef<ModifyDialogComponent>,
    private appointmentService: AppointmentService,
    private employeeService: EmployeeService, 
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: Appointment) { 
      this.employeeService.getAllEmployees().subscribe(data => {
        this.employees = data;
      })

      this.customerService.getAllCustomers().subscribe(data => {
        this.customers = data;
      })
    }

  onNoClick(): void {
    this.dialogRef.close("No Click");
  }

  addAppointment(){
    this.validateAppointment();
    
    if(this.valid){
      let splitDateTime = this.startDateTime.toString();
      let startDate = splitDateTime.split('T')[0]
      let startTime = splitDateTime.split('T')[1]
      let splitEndDate = this.endDateTime.toString();
      let endDate = splitEndDate.split('T')[0]
      let endTime = splitEndDate.split('T')[1]
    
      this.customers.forEach(customer =>{
        if(customer.customerName == this.cust){
          this.customer = customer;
        }
      })
      
      this.employees.forEach(e => {
        if(e.employeeName == this.employeeName){
          this.employee = e;
        }
      })

      if(this.customer == undefined){
        this.customer = this.customers[0];
      }
      if(this.employee == undefined){
        this.employee = this.employees[0];
      }


      let newAppointment = new Appointment;
      newAppointment.title = this.appointmentTitle;
      newAppointment.customerId = this.customer.customerId;
      newAppointment.employeeId = this.employee.employeeId;
      newAppointment.startDate = startDate;
      newAppointment.startTime = startTime;
      newAppointment.endDate = endDate;
      newAppointment.endTime = endTime;
      newAppointment.lastUpdated = new Date();
      newAppointment.createdDate = new Date();
    

      this.appointmentService.addAppointment(newAppointment).subscribe(result => {  
        this.dialogRef.close(result);
      })
    }    


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
