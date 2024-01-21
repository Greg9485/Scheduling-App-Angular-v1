import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppointmentsWithEmployeeCustomerInfo } from '../Interfaces/interface';
import { Employee } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private appointmentUrl = environment.SERVER_API_URL + 'appointment'

  constructor(
    private http: HttpClient) { }

//   addAppointment(newAppointment: Appointment): Observable<any>{
//     return this.http.post(`${this.appointmentUrl}`, newAppointment, {responseType: 'text'})
//   }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.appointmentUrl}/getAllEmployees`)
  }

}
