export class Project {

    id: number;
    name: string;
    description: string;
    companyId: number;

    constructor(projectDb: any) {
        this.id = projectDb["id"]
        this.name = projectDb["name"]
        this.description = projectDb["description"]
        this.companyId = projectDb["companyId"]
    }
    
}
