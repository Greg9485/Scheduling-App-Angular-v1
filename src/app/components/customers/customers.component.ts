import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickedEvent } from 'ag-grid-community';
import { ModifyCustomerDialogComponent } from './modify-customer-dialog/modify-customer-dialog.component';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


  columnDefs: any = [
    {headerName: 'Customer ID', field: 'id', sortable: true, filter: true},
    {headerName: 'Customer Name', field: 'name', sortable: true, filter: true},
    {headerName: 'Customer Address', field: 'address', sortable: true, filter: true},
    {headerName: 'State/Province', field: 'stateProvince', sortable: true, filter: true},
    {headerName: 'Country', field: 'country', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phoneNumber', sortable: true, filter: true},
    {headerName: 'Zip Code', field: 'zipCode', sortable: true, filter: true},
    {headerName: 'Address ID', field: 'addressId', sortable: true, filter: true},
    {headerName: 'Active', field: 'active', sortable: true, filter: true}
  ]

/*  defaultColDef: ColDef = {
    sortable: true, 
    filter: true
  }*/


  rowData=[
    {id: '1', name: 'Jim Morrison', address: '102 Whiskey Bar Ln', stateProvince: 'California', country: 'USA', phoneNumber: '555-555-5555', zipCode: '42069', addressId: '1', active: 'No'},
    {id: '2', name: 'Jimmy Hendrix', address: '420 Acid Dr', stateProvince: 'California', country: 'USA', phoneNumber: '555-420-6969', zipCode: '42069', addressId: '2', active: 'No'},
    {id: '3', name: 'Janis Joplin', address: '99 Jim Beam Dr', stateProvince: 'California', country: 'USA', phoneNumber: '555-555-1234', zipCode: '42069', addressId: '3', active: 'Yes'},
    {id: '4', name: 'Stanley Kubrick', address: '2001 Space Odessy Ave', stateProvince: 'California', country: 'USA', phoneNumber: '555-555-2001', zipCode: '42069', addressId: '4', active: 'Yes'},
  ]

  selectedAppointment: any;
  rowSelection: any;


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  addCustomer(){
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed')
      this.rowSelection = result;
    })
  }

  deleteCustomer(){
    if(this.rowSelection == null || this.rowSelection == undefined){
      const err = window.alert("Please select a row to delete.")
      return;
    }else{
      console.log(JSON.stringify(this.rowSelection, null, 4))
    }
    
  }

  modifyCustomer(){
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
    const dialogRef = this.dialog.open(ModifyCustomerDialogComponent, {
      width: '350px',
      data:  {id: this.rowSelection.id, name: this.rowSelection.name, address: this.rowSelection.address, 
        stateProvince: this.rowSelection.stateProvince, country: this.rowSelection.country, phoneNumber: this.rowSelection.phoneNumber, zipCode: this.rowSelection.zipCode, 
        addressId: this.rowSelection.addressId, active: this.rowSelection.active
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog was closed')
      this.rowSelection = result;
    })
  }



}
