import { User } from "./user";
import { Customer } from "./customer";
import { Appointment } from "./appointment";
import { Contact } from "./contact";

export class AppointmentsWithEmployeeCustomerInfo{
    appointmentVOList: Appointment[];
    customerList: Customer[];
    employeeList: Contact[]
    
    
    
    // appointmentVOList: [
    //     {
    //         title: string,
    //         startDate: string, 
    //         startTime: string, 
    //         endDate: string, 
    //         endTime: string, 
    //         createdDate: any, 
    //         createdBy: string, 
    //         lastUpdated: any, 
    //         lastUpdatedBy: string, 
    //         customerId: number, 
    //         employeeId: number
    //     }
    // ]
}