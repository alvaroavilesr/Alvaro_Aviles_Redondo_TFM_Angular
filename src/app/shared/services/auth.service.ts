import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private readonly userRoleSubject = new BehaviorSubject<string | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(private readonly router: Router) {
    this.checkLoginStatus();
    this.checkRole();
  }

  checkLoginStatus(): boolean {
    const isLogged = sessionStorage.getItem('JWT') !== null &&
      sessionStorage.getItem('UserName') !== null &&
      sessionStorage.getItem('UserEmail') !== null &&
      sessionStorage.getItem('Role') !== null;

    this.isLoggedInSubject.next(isLogged);
    return isLogged;
  }

  checkRole(): string | null {
    const role = sessionStorage.getItem('Role');
    this.userRoleSubject.next(role);
    return role;
  }

  logout(): void {
    sessionStorage.removeItem('JWT');
    sessionStorage.removeItem('UserName');
    sessionStorage.removeItem('UserEmail');
    sessionStorage.removeItem('Role');
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
    this.router.navigate(['/home']);
  }
}
