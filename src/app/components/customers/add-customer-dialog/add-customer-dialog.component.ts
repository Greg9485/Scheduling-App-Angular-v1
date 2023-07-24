import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer';

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
    @Inject(MAT_DIALOG_DATA) public data: Customer) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
