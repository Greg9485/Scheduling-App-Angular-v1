import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-modify-customer-dialog',
  templateUrl: './modify-customer-dialog.component.html',
  styleUrls: ['./modify-customer-dialog.component.scss']
})
export class ModifyCustomerDialogComponent {
  constructor(public dialogRef: MatDialogRef<ModifyCustomerDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    public customerService: CustomerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  modifyCustomer(){
    this.customerService.updateCustomer(this.data.customerId, this.data).subscribe(result => {
      if(result == "Success"){
        this.dialogRef.close(result)
      }
    })
  }

}
