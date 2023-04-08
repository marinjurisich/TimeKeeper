export class User {

  companyName: string | null;
  companyAddress: string | null;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  password: string | null;
  password2: string | null;
  payPerHour: string | null;
  isAdmin: string | null;



  constructor(credentials: any) {

    this.companyName = credentials.companyName;
    this.companyAddress = credentials.companyAddress;

    this.firstName = credentials.adminFirstName || credentials.userFirstName || credentials.firstName;
    this.lastName = credentials.adminLastName || credentials.userLastName || credentials.lastName;
    this.emailAddress = credentials.adminEmailAddress || credentials.userEmailAddress || credentials.emailAddress;

    this.password = credentials.adminPassword1 || credentials.userPassword1 || credentials.password1 || credentials.adminPassword || credentials.userPassword || credentials.password;
    this.password2 = credentials.adminPassword2 || credentials.userPassword2 || credentials.password2;

    this.payPerHour = credentials.payPerHour;
    this.isAdmin = credentials.isAdmin;
  }
}
