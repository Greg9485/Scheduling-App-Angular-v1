import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyDialogData } from 'src/app/interface';
import { Appointment } from 'src/app/model/appointment';

@Component({
  selector: 'app-modify-dialog',
  templateUrl: './modify-dialog.component.html',
  styleUrls: ['./modify-dialog.component.scss']
})
export class ModifyDialogComponent {

  constructor(public dialogRef: MatDialogRef<ModifyDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Appointment) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
