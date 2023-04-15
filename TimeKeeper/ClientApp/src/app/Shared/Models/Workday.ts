export class Workday {

    id: number;
    userId: number;
    date: string;  // e.g. 2023-01-10T00:00:00
    projectId: number;
    clockIn: string;  // e.g. 2023-01-10T00:00:00
    clockOut: string;  // e.g. 2023-01-10T00:00:00
    workHours: number;
    description: string;
    grade: number;
    attachment: string | null;

    constructor(workday_obj: any) {
        this.id = workday_obj["id"];
        this.userId = workday_obj["userId"];
        this.date = workday_obj["date"];
        this.projectId = workday_obj["projectId"];
        this.clockIn = workday_obj["clockIn"];
        this.clockOut = workday_obj["clockOut"];
        this.workHours = workday_obj["workHours"];
        this.description = workday_obj["description"];
        this.grade = workday_obj["grade"];
        this.attachment = workday_obj["attachment"];
    }

    public getClockInTime(): string {
        return this.clockIn.split("T")[1];
    }

    public getClockOutTime(): string {
        return this.clockOut.split("T")[1];
    }

    public getDateIso(): string {
        return this.date.split("T")[0];
    }
}
