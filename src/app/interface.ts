export interface Interface {
}

export interface ModifyDialogData{
    appointmentId: number;
    userId: string;
    customerId: string;
    appointmentTitle: string;
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;

}

export interface Employee{
    employeeId: number;
    employeeName: string;
    email: string;
}