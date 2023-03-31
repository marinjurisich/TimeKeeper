import { User } from "../Models/User";

export class Storage {

  // Key under which user will be stored
  private static key: string = "user_session";

  // Save user either to sessionStorage or to localStorage
  public static saveUser(user: User, rememberMe: boolean = false) {

    if (user) {
      let val = JSON.stringify(user);

      if (rememberMe) {
        localStorage.setItem(this.key, val);  // Save to perm memory
        sessionStorage.removeItem(this.key);  // Delete any leftover logins from session
      }
      else {
        sessionStorage.setItem(this.key, val);  // Do not save to perm memory
        localStorage.removeItem(this.key);  // Delete any previous logins in localStorage
      }
    }
  }

  // Try to get user from session storage (temp memory) or from local storage (perm memory)
  public static getUser(): any | null {
    return sessionStorage.getItem(this.key) || localStorage.getItem(this.key);
  }

}
