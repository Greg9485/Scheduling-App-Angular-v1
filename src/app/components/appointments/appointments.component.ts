import { Component, OnInit } from '@angular/core';
import { CellClickedEvent, ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { ModifyDialogComponent } from './modify-dialog/modify-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { AppointmentService } from 'src/app/service/appointment.service';
import { Appointment } from 'src/app/model/appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  private gridApi!: GridApi<Appointment>;
  rowData: Appointment[] = [];
  selectedAppointment: any;
  rowSelection: any;
  showDeletedMessage: boolean = false;  
  showAddedMessage: boolean = false;
  showModifiedMessage: boolean = false;

  columnDefs: any = [
    {headerName: 'Employee Name', field: 'employeeName', sortable: true, filter: true},
    {headerName: 'Customer Name', field: 'customerName', sortable: true, filter: true},
    {headerName: 'Appointment Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Start Date', field: 'startDate', sortable: true, filter: true},
    {headerName: 'Start Time', field: 'startTime', sortable: true, filter: true},
    {headerName: 'End Date', field: 'endDate', sortable: true, filter: true},
    {headerName: 'End Time', field: 'endTime', sortable: true, filter: true}
  ]

  defaultColDef: ColDef = {
    sortable: true, 
    filter: true
  }

  constructor(public dialog: MatDialog, 
              public appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  onGridReady(params: GridReadyEvent<Appointment>) {
    this.gridApi = params.api;    
    this.populateRowData();
  }

  populateRowData(){
    this.appointmentService.getAllAppointments().subscribe(data => {
       this.gridApi.setRowData([]);
      this.gridApi.setRowData(data.appointmentVOList);
    })
  }

  addAppointment(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "Success"){
        this.showAddedMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showAddedMessage = false;
        }, 3000) 
       }else{
        window.alert("Save failed.")
      }
    })
  }

  deleteAppointment(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to delete.")
      return;
    }else{
      const alrt = window.confirm("Are you sure you want to delete the appointment for " + 
      this.rowSelection.title + "?");
      if(alrt){
        this.appointmentService.deleteAppointment(this.rowSelection.appointmentId).subscribe(result =>{
          if(result == "Success"){      
            this.showDeletedMessage = true;
            this.populateRowData();
            setTimeout(() =>{
              this.showDeletedMessage = false;
            }, 3000)
          }else{
            window.alert("Delete failed");
          }
        });
      }
    }
    
  }

  modifyAppointment(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to modify.")
      return;
    }else{
      this.openModifyDialog();
    }
  }

  onRowSelected(event: CellClickedEvent){
    this.rowSelection = null;
    this.rowSelection = event.data
  }

  openModifyDialog(): void{
    const dialogRef = this.dialog.open(ModifyDialogComponent, {
      width: '65%',
      data: {
        appointmentId: this.rowSelection.appointmentId, 
        employeeId: this.rowSelection.employeeId, 
        customerId: this.rowSelection.customerId, 
        title: this.rowSelection.title, 
        startDate: this.rowSelection.startDate, 
        startTime: this.rowSelection.startTime,
        endDate: this.rowSelection.endDate, 
        endTime: this.rowSelection.endTime
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showModifiedMessage = true;
      this.populateRowData();
      setTimeout(() =>{
        this.showModifiedMessage = false;
      }, 3000)
    })
  }
  
}
