import { Injectable } from '@angular/core';
import { Appointment } from '../model/appointment';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppointmentsWithEmployeeCustomerInfo } from '../Interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {


  private appointmentUrl = environment.SERVER_API_URL + 'appointment'

  constructor(private http: HttpClient) { }

  addAppointment(newAppointment: Appointment): Observable<any>{
    return this.http.post(`${this.appointmentUrl}/addAppointment`, newAppointment, {responseType: 'text'})
  }

  getAllAppointments(): Observable<AppointmentsWithEmployeeCustomerInfo> {
    return this.http.get<AppointmentsWithEmployeeCustomerInfo>(`${this.appointmentUrl}/getAllAppointments`)
  }

  updateAppointment(id: number, appointment: Appointment): Observable<any>{
    return this.http.put(`${this.appointmentUrl}/updateAppointment/${id}`, appointment, {responseType: 'text'})
  }

  deleteAppointment(id: number){
    return this.http.delete(`${this.appointmentUrl}/deleteAppointment/${id}`, {responseType: 'text'})
  }

  getAppointmentsByCustomerId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.appointmentUrl}/getAllAppointmentsByCustomerId/?id=${id}`)
  }
  
  deleteAppointmentsByCustomerId(id: number){
    return this.http.delete(`${this.appointmentUrl}/deleteAppointmentsByCustomerId/${id}`, {responseType: 'text'})
  }


}
