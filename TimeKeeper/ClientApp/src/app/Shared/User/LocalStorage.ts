export class LocalStorage {

  //User login

  public static setUserToLocalStorage(credentials: any): void {
    if (credentials) {
      localStorage.setItem('user', JSON.stringify(credentials));
    }
  }

  public static getUserFromLocalStorage(): any {
    return localStorage.getItem('user');
  }
}
