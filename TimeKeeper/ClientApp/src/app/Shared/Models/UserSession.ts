import { environment } from "src/environments/environment";
import { Month } from "./Month";
import { Workday } from "./Workday";

export class UserSession {
    // A class used for saving user's data after login

    userId: number;
    months: Month[];
    workdays: Workday[];

    constructor(userId: number, months: Month[], workdays: Workday[]) {
        this.userId = userId;
        this.months = months;
        this.workdays = workdays;
    }

    // Fetch all parameters from server
    static async fetchUserData(userId: number): Promise<UserSession> {

        let monthsUrl = environment.API_URL + "/Month/GetLastTwelveMonths/?userId=" + userId;
        let monthsLastYear = await fetch(monthsUrl).then(res => res.json());

        let workdaysUrl = environment.API_URL + "/Workday/List/" + userId;
        let workdaysLastYear = await fetch(workdaysUrl).then(res => res.json());

        return new UserSession(userId, monthsLastYear, workdaysLastYear);
    }

}