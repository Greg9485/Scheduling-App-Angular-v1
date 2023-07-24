import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-modify-customer-dialog',
  templateUrl: './modify-customer-dialog.component.html',
  styleUrls: ['./modify-customer-dialog.component.scss']
})
export class ModifyCustomerDialogComponent {
  constructor(public dialogRef: MatDialogRef<ModifyCustomerDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Customer) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
