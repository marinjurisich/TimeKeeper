import { environment } from "src/environments/environment";
import { Month } from "./Month";
import { Workday } from "./Workday";
import { User } from "./User";
import { Project } from "./Project";

export class UserSession {
    // A class used for saving user's data after login

    userId: number;
    months: Month[];
    workdays: Workday[];
    projects: Project[];

    constructor(userId: number, months: Month[], workdays: Workday[], projects: Project[]) {
        this.userId = userId;
        this.months = months;
        this.workdays = workdays;
        this.projects = projects;
    }

    // Fetch all parameters from server
    static async fetchUserData(user: User): Promise<UserSession> {

        let monthsUrl = environment.API_URL + "/Month/GetLastTwelveMonths/?userId=" + user.id;
        let monthsLastYear = await fetch(monthsUrl).then(res => res.json());

        let workdaysUrl = environment.API_URL + "/Workday/List/" + user.id;
        let workdaysLastYear = await fetch(workdaysUrl).then(res => res.json());

        let projectsUrl = environment.API_URL + "/Project/GetCompanyProjects/?companyId=" + user.companyId;
        let projects = await fetch(projectsUrl).then(res => res.json());

        return new UserSession(parseInt(user.id || "0"), monthsLastYear, workdaysLastYear, projects);
    }

}