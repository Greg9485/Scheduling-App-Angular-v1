import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyDialogComponent } from '../modify-dialog/modify-dialog.component';
import { Appointment } from 'src/app/model/appointment';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent {

  userId: number;
  appointmentTitle: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;


  constructor(public dialogRef: MatDialogRef<ModifyDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Appointment) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
