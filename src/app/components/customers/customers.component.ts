import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ModifyCustomerDialogComponent } from './modify-customer-dialog/modify-customer-dialog.component';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { AppointmentService } from 'src/app/service/appointment.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  showDeletedMessage: boolean = false;  
  showAddedMessage: boolean = false;
  showModifiedMessage: boolean = false;
  showDeletedCanceledMessage: boolean = false;
  showAddCanceledMessage: boolean = false;
  showModifiedCanceledMessage: boolean = false;
  private gridApi!: GridApi<Customer>;  
  rowData: Customer[] = [];
  selectedAppointment: any;
  rowSelection: any;

  columnDefs: any = [
    {headerName: 'Active', field: 'isActive', sortable: true, filter: true},  
    {headerName: 'Customer Name', field: 'customerName', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phoneNumber', sortable: true, filter: true},
    {headerName: 'Customer Address', field: 'address', sortable: true, filter: true},
    {headerName: 'Zip Code', field: 'zipCode', sortable: true, filter: true},  
  ]

  constructor(public dialog: MatDialog,
    public customerService: CustomerService,
    public appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }


  onGridReady(params: GridReadyEvent<Customer>) {
    this.gridApi = params.api;    
    this.populateRowData();
  }

  populateRowData(){
    this.customerService.getAllCustomers().subscribe(data => {
       this.gridApi.setRowData([]);
      this.gridApi.setRowData(data);
    })
  }

  addCustomer(){
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
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
        this.showAddCanceledMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showAddCanceledMessage = false;
        }, 3000)       }
    })
  }

  checkForAppointments(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to delete.")
      return;
    }else{
      this.appointmentService.getAppointmentsByCustomerId(this.rowSelection.customerId).subscribe(data =>{
        if(data == null){
          const alrt = window.confirm("Are you sure you want to delete " + 
          this.rowSelection.customerName + " from the list of customers?");
          if(alrt){    
            this.deleteCustomer();
          }else{
            this.showDeletedCanceledMessage = true;
            setTimeout(() =>{
              this.showDeletedCanceledMessage = false;
            }, 3000)
          }
        }else{
          const alrt = window.confirm("Customer has at least one appointment. Do you want to delete" +
          " this customer and all their appointments?");
          if(alrt){
            this.appointmentService.deleteAppointmentsByCustomerId(this.rowSelection.customerId).subscribe(result =>{
              if(result == "Success"){
                this.deleteCustomer();
              }else{
                window.alert("Could not delete all appointments - go to appointments page and delete appointments for this customer individually, then try to delete customer again.")
              }
            })
          }
          else{
            this.showDeletedCanceledMessage = true;
            setTimeout(() =>{
              this.showDeletedCanceledMessage = false;
            }, 3000)
          }
        }
      })
      }
    }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.rowSelection.customerId).subscribe(result =>{
      if(result == "Success"){           
        this.showDeletedMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showDeletedMessage = false;
        }, 3000)
      }else{
        this.showDeletedCanceledMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showDeletedCanceledMessage = false;
        }, 3000)
      }
    });    
  }

  modifyCustomer(){
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
    const dialogRef = this.dialog.open(ModifyCustomerDialogComponent, {
      width: '65%',
      data:  {
          customerId: this.rowSelection.customerId, 
          customerName: this.rowSelection.customerName, 
          address: this.rowSelection.address, 
          phoneNumber: this.rowSelection.phoneNumber, 
          zipCode: this.rowSelection.zipCode, 
          isActive: this.rowSelection.isActive,
          createdDate: this.rowSelection.createdDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == "Success"){
        this.showModifiedMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showModifiedMessage = false;
        }, 3000)  
      }else{
        this.showModifiedCanceledMessage = true;
        this.populateRowData();
        setTimeout(() =>{
          this.showModifiedCanceledMessage = false;
        }, 3000)  
      }
    })
  }

}
