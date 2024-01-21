import { Timestamp } from "rxjs";
import { User } from "./user";

export class Appointment {
    appointmentId: number;
    employeeId: number;
    customerId: number;
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    /*id: number;
    appointmentTitle: string;
    description: string; 
    location: string;
    type: string; 
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;*/
    createdDate: Date;
    createdTime: string;
    createdBy: User;
    lastUpdated: Date;
    lastUpdatedBy: string; //userID
    
}
