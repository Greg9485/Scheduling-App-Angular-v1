import { Appointment } from "../model/appointment";
import { Customer } from "../model/customer";
import { Employee } from "../interface";

export class AppointmentsWithEmployeeCustomerInfo{
    appointmentVOList: Appointment[];
    customerList: Customer[];
    employeeList: Employee[];
}