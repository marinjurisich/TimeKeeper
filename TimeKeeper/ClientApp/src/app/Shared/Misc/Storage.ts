import { User } from "../Models/User";
import { UserSession } from "../Models/UserSession";
import { Workday } from "../Models/Workday";

export class Storage {

  // Keys in session
  public static userKey: string = "user_session";
  public static userDataKey: string = "user_data_session";

  // Save user either to sessionStorage or to localStorage
  public static saveUser(user: User, rememberMe: boolean = false) {

    let val = JSON.stringify(user);

    if (rememberMe) {
      localStorage.setItem(this.userKey, val);  // Save to perm memory
      sessionStorage.removeItem(this.userKey);  // Delete any leftover logins from session
    }
    else {
      sessionStorage.setItem(this.userKey, val);  // Do not save to perm memory
      localStorage.removeItem(this.userKey);  // Delete any previous logins in localStorage
    }
  }

  // Try to get user from session storage (temp memory) or from local storage (perm memory)
  public static getUser(): User | null {

    let userJson = sessionStorage.getItem(this.userKey) || localStorage.getItem(this.userKey);
    if (userJson) {
      // let user = new User(userJson);
      let user = new User(JSON.parse(userJson));
      return user;
    }
    return null;
  }

  public static userLogout(): void {

    // Remove user from session
    sessionStorage.removeItem(this.userKey);
    localStorage.removeItem(this.userKey);

    // Remove user data from session
    Storage.deleteUserData();
  }

  public static saveUserData(userData: UserSession, rememberMe: boolean): void {

    let val = JSON.stringify(userData);

    if (rememberMe) {
      localStorage.setItem(this.userDataKey, val);  // Save to perm memory
      sessionStorage.removeItem(this.userDataKey);  // Delete any leftover logins from session
    }
    else {
      sessionStorage.setItem(this.userDataKey, val);  // Do not save to perm memory
      localStorage.removeItem(this.userDataKey);  // Delete any previous logins in localStorage
    }
  }

  public static getUserData() : UserSession {

    let userDataJson = sessionStorage.getItem(this.userDataKey) || localStorage.getItem(this.userDataKey);
    if (userDataJson) {
      let userDataObj = JSON.parse(userDataJson);
      return userDataObj;
    }
    else {
      let userData = new UserSession(-1, [], [], []);
      return userData;
    }
  }

  public static deleteUserData(): void {
    sessionStorage.removeItem(this.userDataKey);
    localStorage.removeItem(this.userDataKey);
  }

}
