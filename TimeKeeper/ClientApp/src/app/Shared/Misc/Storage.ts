import { User } from "../Models/User";

export class Storage {

  // Key under which user will be stored
  private static userKey: string = "user_session";

  // Save user either to sessionStorage or to localStorage
  public static saveUser(user: User, rememberMe: boolean = false) {

    if (user) {
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

  public static deleteUser(): void {
    sessionStorage.removeItem(this.userKey);
    localStorage.removeItem(this.userKey);
  }

}
