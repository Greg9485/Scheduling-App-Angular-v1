import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';
import {OverlayModule } from '@angular/cdk/overlay'
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  columnDefs: any = [
    {headerName: 'Appointment ID', field: 'appointmentId', sortable: true, filter: true},
    {headerName: 'User ID', field: 'userId', sortable: true, filter: true},
    {headerName: 'Customer ID', field: 'customerId', sortable: true, filter: true},
    {headerName: 'Appointment Title', field: 'appointmentTitle', sortable: true, filter: true},
    {headerName: 'Start Date', field: 'startDate', sortable: true, filter: true},
    {headerName: 'Start Time', field: 'startTime', sortable: true, filter: true},
    {headerName: 'End Date', field: 'endDate', sortable: true, filter: true},
    {headerName: 'End Time', field: 'endTime', sortable: true, filter: true}
  ]

  defaultColDef: ColDef = {
    sortable: true, 
    filter: true
  }


  rowData=[
    {appointmentId: '1', userId: '3', customerId: '102', appointmentTitle: 'Our First Customer Meeting', startDate: '07/24/2023', startTime: '10:00 AM', endDate: '07/24/2023', endTime: '12:00 PM'},
    {appointmentId: '2', userId: '5', customerId: '100', appointmentTitle: 'Our First Customer Meeting', startDate: '07/26/2023', startTime: '11:30 AM', endDate: '07/26/2023', endTime: '02:00 PM'},
    {appointmentId: '3', userId: '1', customerId: '101', appointmentTitle: 'Our First Customer Meeting', startDate: '07/29/2023', startTime: '09:00 AM', endDate: '07/29/2023', endTime: '11:00 AM'},
    {appointmentId: '4', userId: '2', customerId: '125', appointmentTitle: 'Our First Customer Meeting', startDate: '07/23/2023', startTime: '11:00 AM', endDate: '07/23/2023', endTime: '01:00 PM'},
    {appointmentId: '5', userId: '5', customerId: '135', appointmentTitle: 'Our First Customer Meeting', startDate: '07/25/2023', startTime: '01:00 pM', endDate: '07/25/2023', endTime: '03:00 PM'},
    {appointmentId: '6', userId: '4', customerId: '144', appointmentTitle: 'Our First Customer Meeting', startDate: '07/27/2023', startTime: '07:00 pM', endDate: '07/27/2023', endTime: '08:00 PM'},
    {appointmentId: '7', userId: '3', customerId: '102', appointmentTitle: 'Our First Customer Meeting', startDate: '07/29/2023', startTime: '12:00 PM', endDate: '07/29/2023', endTime: '02:00 PM'},
  ]

  selectedAppointment: any;
  rowSelection: any;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addAppointment(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed')
      this.rowSelection = result;
    })
  }

  deleteAppointment(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to delete.")
      return;
    }else{
      console.log(JSON.stringify(this.rowSelection, null, 4))
    }
    
  }

  modifyAppointment(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to modify.")
      return;
    }else{
      this.openModifyDialog();
      console.log(JSON.stringify(this.rowSelection, null, 4))
    }
  }

  onRowSelected(event: CellClickedEvent){
    this.rowSelection = null;
    this.rowSelection = event.data
    console.log(JSON.stringify(this.rowSelection, null, 4))
  }

  openModifyDialog(): void{
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      width: '350px',
      data: {appointmentId: this.rowSelection.appointmentId, userId: this.rowSelection.userId, customerId: this.rowSelection.customerId, 
        appointmentTitle: this.rowSelection.appointmentTitle, startDate: this.rowSelection.startDate, startTime: this.rowSelection.startTime,
         endDate: this.rowSelection.endDate, endTime: this.rowSelection.endTime}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed')
      this.rowSelection = result;
    })
  }



}
