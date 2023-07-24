import { Timestamp } from "rxjs";
import { User } from "./user";

export class Appointment {
    appointmentId: number;
    userId: string;
    customerId: string;
    appointmentTitle: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
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
    lastUpdated: string;
    lastUpdatedBy: number; //userID
    
}
