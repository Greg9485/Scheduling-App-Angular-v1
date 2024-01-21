import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.scss']
})
export class AddCustomerDialogComponent {

  customerName: string;
  customerAddress: string;
  customerStateProvince: string;
  customerZipCode: string;
  customerPhoneNumber: string;
  customerActive: string;

  constructor(public dialogRef: MatDialogRef<AddCustomerDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public customerService: CustomerService) { 
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCustomer(){

    let newCustomer = new Customer();
    newCustomer.address = this.customerAddress + " " + this.customerStateProvince;
    newCustomer.customerName = this.customerName;
    newCustomer.zipCode = this.customerZipCode;
    newCustomer.phoneNumber = this.customerPhoneNumber;
    newCustomer.isActive = this.customerActive;
    newCustomer.createdDate = new Date();

    this.customerService.addCustomer(newCustomer).subscribe(result => {  
      this.dialogRef.close(result);
    })
  }



}
