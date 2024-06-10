// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly VALID_USERNAME = 'katznicho';
  private readonly VALID_PASSWORD = '12345678';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  login(credentials: { username: string; password: string }) {
    if (
      credentials.username == this.VALID_USERNAME &&
      credentials.password == this.VALID_PASSWORD
    ) {
      // Simulate a token for logged-in user
      const fakeToken = 'fake-jwt-token';
      localStorage.setItem('token', fakeToken);
      this.loggedIn.next(true);
      return of({ token: fakeToken });
    } else {
      console.log("invalide")
      return throwError(new Error('Invalid credentials'));
    }
  }

  isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
