import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus(): boolean {
    const isLogged = sessionStorage.getItem('JWT') !== null &&
      sessionStorage.getItem('UserName') !== null &&
      sessionStorage.getItem('UserEmail') !== null &&
      sessionStorage.getItem('Role') !== null;

    this.isLoggedInSubject.next(isLogged);
    return isLogged;
  }

  logout(): void {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('UserEmail');
    sessionStorage.removeItem('Role');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/home']);
  }
}
