import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppointmentsWithEmployeeCustomerInfo } from '../Interfaces/interface';
import { Employee } from '../interface';
import { Customer } from '../model/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {


  private customerUrl = environment.SERVER_API_URL + 'customer'

  constructor(
    private http: HttpClient) { }

  addCustomer(newCustomer: Customer): Observable<any>{
    return this.http.post(`${this.customerUrl}/addCustomer`, newCustomer, {responseType: 'text'})
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customerUrl}/getAllCustomers`)
  }

  deleteCustomer(id: number){
    return this.http.delete(`${this.customerUrl}/deleteCustomer/${id}`, {responseType: 'text'})
  }

  updateCustomer(id: number, customer: Customer): Observable<any>{
    return this.http.put(`${this.customerUrl}/updateCustomer/${id}`, customer, {responseType: 'text'})
  }


}
