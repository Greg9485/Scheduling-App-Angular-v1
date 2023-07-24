import { Appointment } from "./appointment";

export class Customer {
    id: number;
    name: string;
    address: string;
    stateProvince: string;
    zipCode: string;
    phoneNumber: string;
    active: string;
    createdDate: Date;
    createdTime: string;
    lastUpdated: Date;
    lastUpdatedBy: number; //userID
    appointments: Appointment[];
}
