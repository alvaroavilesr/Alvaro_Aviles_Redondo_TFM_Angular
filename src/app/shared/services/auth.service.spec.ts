import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('AuthService tests', () => {
  let service: AuthService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideRouter([]), // Reemplaza RouterTestingModule
        { provide: Router, useValue: router }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('AUTH SERVICE - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('AUTH SERVICE - should return false when no session data is available', () => {
    sessionStorage.clear();
    const result = service.checkLoginStatus();
    expect(result).toBeFalse();
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
    });
  });

  it('AUTH SERVICE - should return true when session data is available', () => {
    sessionStorage.setItem('JWT', 'mockToken');
    sessionStorage.setItem('UserName', 'testuser');
    sessionStorage.setItem('UserEmail', 'test@example.com');
    sessionStorage.setItem('Role', 'admin');

    const result = service.checkLoginStatus();
    expect(result).toBeTrue();
    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeTrue();
    });
  });

  it('AUTH SERVICE - should log out and redirect to home', () => {
    sessionStorage.setItem('JWT', 'mockToken');
    sessionStorage.setItem('UserName', 'testuser');
    sessionStorage.setItem('UserEmail', 'test@example.com');
    sessionStorage.setItem('Role', 'admin');
    service.checkLoginStatus();

    service.logout();

    expect(sessionStorage.getItem('JWT')).toBeNull();
    expect(sessionStorage.getItem('UserName')).toBeNull();
    expect(sessionStorage.getItem('UserEmail')).toBeNull();
    expect(sessionStorage.getItem('Role')).toBeNull();

    expect(router.navigate).toHaveBeenCalledWith(['/home']);

    service.isLoggedIn$.subscribe(isLoggedIn => {
      expect(isLoggedIn).toBeFalse();
    });
  });
});
