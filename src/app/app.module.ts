import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModifyDialogComponent } from './components/appointments/modify-dialog/modify-dialog.component';
import { AddDialogComponent } from './components/appointments/add-dialog/add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCustomerDialogComponent } from './components/customers/add-customer-dialog/add-customer-dialog.component';
import { ModifyCustomerDialogComponent } from './components/customers/modify-customer-dialog/modify-customer-dialog.component';



function sendToLoginPage(injector: Injector){
  const router = injector.get(Router)
  router.navigate(['/login']) ;
}

const routes: Routes = [
  {path: 'contacts', component: ContactsComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'appointments', component: AppointmentsComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
]



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppointmentsComponent,
    CustomersComponent,
    ContactsComponent,
    NavComponent, 
    ModifyDialogComponent,
    AddDialogComponent,
    AddCustomerDialogComponent,
    ModifyCustomerDialogComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes, {enableTracing: false }),
    FormsModule,
    AgGridModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
