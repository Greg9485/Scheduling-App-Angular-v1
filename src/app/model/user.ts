import { Appointment } from "./appointment";

export class User {
    id: number;
    userName: string;
    password: string;
    createdDate: Date;
    createdTime: string;
    lastUpdated: Date;
    lastUpdatedBy: number; //userID
    appointments: Appointment[];
}
