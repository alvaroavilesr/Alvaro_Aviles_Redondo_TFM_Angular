import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {

  constructor(private router: Router,
              private location: Location,
              private cdr: ChangeDetectorRef) {}

  protected readonly sessionStorage = sessionStorage;
  isLoggedIn = false;

  ngAfterViewInit() {
    if (localStorage.getItem('logoutOngoing') === 'true') {
      localStorage.removeItem('logoutOngoing');
      localStorage.setItem('logoutSuccessful', 'true');
      this.router.navigate(['/home']);
    }else{
      this.checkLoginStatus();
      window.addEventListener('storage', this.handleStorageChange.bind(this));
    }
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.handleStorageChange.bind(this));
  }

  private checkLoginStatus() {
    this.isLoggedIn = !!sessionStorage.getItem('token');
    this.cdr.detectChanges();
  }

  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'token') {
      this.checkLoginStatus();
    }
  }

  logout() {
    localStorage.setItem('logoutOngoing', 'true');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.checkLoginStatus();
    this.location.go(this.location.path());
    window.location.reload();
  }

}
