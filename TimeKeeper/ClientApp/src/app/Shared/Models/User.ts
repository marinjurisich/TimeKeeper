export class User {

  id: string | null;
  companyName: string | null;
  companyAddress: string | null;
  companyId: string | null;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  password: string | null;
  confirmPassword: string | null;
  payPerHour: string | null;
  isAdmin: any = false;
  grade: any = 0;
  guid: string | null;



  constructor(credentials: any) {

    this.id = credentials.id;

    this.companyName = credentials.companyName;
    this.companyAddress = credentials.companyAddress;

    this.firstName = credentials.firstName;
    this.lastName = credentials.lastName;
    this.emailAddress = credentials.email;

    this.password = credentials.password;
    this.confirmPassword = credentials.confirmPassword;

    this.payPerHour = credentials.payPerHour;
    this.isAdmin = credentials.isAdmin;

    this.companyId = credentials.companyId;
    this.grade = credentials.grade;

    this.guid = credentials.guid;
  }
}
