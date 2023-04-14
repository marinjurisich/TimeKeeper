export class Month {

    id: number;
    userId: number;
    date: string;
    salary: number;
    grade: number;
    workHours: number;
    payPerHour: number;

    constructor(monthDb: any) {
        this.id = monthDb["id"]
        this.userId = monthDb["userId"]
        this.date = monthDb["date"]
        this.salary = monthDb["salary"]
        this.grade = monthDb["grade"]
        this.workHours = monthDb["workHours"]
        this.payPerHour = monthDb["payPerHour"]
    }
    
}
